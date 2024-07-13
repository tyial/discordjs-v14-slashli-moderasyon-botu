const { Events } = require("discord.js")

module.exports = client => {
    client.on(Events.InteractionCreate, interaction => {
        if (interaction.isCommand()) client.slashInteractions.get(interaction.commandName)?.run(client, interaction);
    });
}  