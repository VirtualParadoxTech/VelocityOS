import DiscordJS, { Intents, Interaction, Options } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new DiscordJS.Client({
    intents: [
     Intents.FLAGS.GUILDS, 
     Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('VelocityOS now online.')

    const guildid = '726885896267366400'
    const guild = client.guilds.cache.get(guildid)

    client.user?.setActivity('North Shore Mountains Research Site', {type: "PLAYING"})

    let commands 

    if (guild){
        commands = guild.commands
    } else {
        client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'A simple command to test if the bot responds.'
    })
    commands?.create({
        name: 'add',
        description: 'Adds two numbers together.',
        options: [{
                name: 'num1',
                description: 'The first number.',
                required: true,
                type: 'NUMBER',

            },
            {
                name: 'num2',
                description: 'The second number.',
                required: true,
                type: 'NUMBER',

            }
        ]
    })
})

client.on('interactionCreate', async (Interaction) => {
if (!Interaction.isCommand()){
    return
}

const {commandName, options} = Interaction

if (commandName === 'ping'){
    Interaction.reply({
        content: 'pong!'
    })
} else if (commandName === 'add'){
    const num1 = options.getNumber('num1') || 0
    const num2 = options.getNumber('num2') || 0

    await Interaction.deferReply({
        ephemeral: true
    })

    await new Promise(resolve => setTimeout(resolve, 5000))

    Interaction.editReply({
        content: (num1 + num2).toString(),
    })
}
})

client.on('messageCreate', (message) => {
if (message.content == 'ping'){
    message.reply({
        content: 'pong!',
    })
}
})


client.login(process.env.TOKEN)