const { Client } = require('discord.js')
      fs = require('fs')
      config = require('./config.json')

const client = new Client();

client.on('ready', () => {
  console.log(`User ${client.user.tag} ready to serve on ${client.channels.size} channels`)
})

client.on('message', message => {
  if (message.author != client.user || !(message.content.startsWith(config.prefix))) return;
  console.log('Command registered!')
  message.delete()
  .then(msg => {
    console.log('Message deleted! Continuing...')
    if (msg.content.toLowerCase() === config.prefix + 'getusers')
    {
      console.log('Getting users...')
      var users = []
      msg.guild.members.forEach(member => {
        users.push(member.user.tag)
      })
      console.log(users);
      console.log("Writing to file...")

      fs.writeFile(`./output/${msg.guild.name}.txt`, users.join('\n'), err => {
        if (err) return console.error(err)
        console.log('File saved!')
      })
    }
  })

})

client.login(config.token)