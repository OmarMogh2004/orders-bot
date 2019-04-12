const Discord = require('discord.js')

const db = require('quick.db') // لا تنسى تحمل البكج ذا | npm i quick.db@7.0.0-b22 | او ضيف ذا السطر لملف البكج اذا كان خادمك مو وندز او لينكس : "quick.db": "^7.0.0-b22",

const bot = new Discord.Client()

const prefix = "$"

 

bot.on('message', msg => {

    let params = msg.content.slice(prefix.length).trim().split(/ +/g);

 

  if(msg.author.bot) return

  if(msg.content.toLowerCase().startsWith(prefix + 'setorder')) {

    if(!params[1]) return msg.channel.send(`Mention the channel`)

    let channel = msg.mentions.channels.first() || msg.guild.channels.find(c => c.name.toLowerCase().startsWith(params[1].toLowerCase()));

    if(channel === undefined) return msg.channel.send(`**I cant find this channel${params[1]}**`)

    db.set(`order.${msg.guild.id}.channel`, channel.id)

    msg.channel.send(`**Orders channel was created successfully ${channel}**`)

  }

})

 

bot.on('message', msg => {

    let params = msg.content.slice(prefix.length).trim().split(/ +/g);

 

  if(msg.author.bot) return

 

  if(msg.content.toLowerCase().startsWith(prefix + 'order')) {

    let args = params.slice(1).join(' ')

    let channelID = db.get(`order.${msg.guild.id}.channel`)

    if(channelID === null || channelID === undefined) return msg.channel.send(`Setup the orders channel with \n ${prefix}setOrder #channel`)

    let channel = msg.guild.channels.get(channelID)

    if(channel === undefined) return msg.channel.send(`Setup the orders channel with \n ${prefix}setOrder #channel`)

    if(!args) return msg.channel.send(`Please write your order^^`)

    let embed = new Discord.RichEmbed()

    .setTitle(`🔔New Order!!`)

    .setDescription(`\**▶sender** => <@${msg.author.id}> \n \n**🛒order =>** **\`${args}\`**`)

    .setFooter(`By Omar`)

    .setTimestamp(Date.now())

    channel.send(embed)

  }

})

bot.login('process.env.BOT_TOKEN');
