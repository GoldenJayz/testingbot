'use strict';
const discord = require("discord.js");
const client = new discord.Client();

let prefix = "!";

client.on('ready', () => {
    console.log("Bot is online!");
});

client.on('message', msg => {
    if(msg.content.startsWith(`${prefix}test`)) {
        msg.channel.send("Testing.");
    }
    if(msg.content.startsWith(`${prefix}help`)) {
        help(msg);
    }
    if(msg.content.startsWith(`${prefix}ban`)) {
        ban(msg);
    }
    if(msg.content.startsWith(`${prefix}kick`)) {
        kick(msg);
    }
});

async function help(message) {
    const embed = new discord.MessageEmbed()
    .setTimestamp()
    .setTitle('Help')
    .addField('Misc.', 'test')
    message.channel.send(embed)
};

async function ban(message) {
    if(!message.guild) return message.channel.send("You need to be in a guild!");
    const user = message.mentions.users.first();
    if(user) {
        const member = message.guild.member(user);
        member
        .ban()
        .then(() => {
            message.channel.send(`Banned ${member}`);
        })
        .catch(err => {
            message.channel.send(`There was an issue banning ${member}`);
            console.error(err);
        });
    } else {
        message.channel.send("The member is not inside of the guild!")
    } 
};

async function kick(message) {
    if(!message.guild) return message.channel.send("You need to be in a guild!");
    const user = message.mentions.users.first();
    if(user) {
        const member = message.guild.member(user);
        member
        .kick()
        .then(() => {
            message.channel.send(`Kicked ${member}`);
        })
        .catch(err => {
            message.channel.send(`There was an issue kicking ${member}`);
            console.error(err);
        });
    } else {
        message.channel.send("The member is not inside of the guild!");
    }
};

async function unban(message, args) {
    if(!message.author.hasPermission("BAN_MEMBERS")) {
        return message.channel.send(`You do not have the ban members permissions!`)
    } else {
        let userid = args[0];
        message.guild.fetchBans()
        .then(bans => {
            if(bans.size == 0) {
                return message.channel.send("There is no bans!")
            } else {
                await message.guild.members.unban(userid);
                await message.channel.send(`Unbanned ${userid}`);
            }
        });
    }
};



client.login("nope")
