const reqEvent = event => require(`../Events/${event}`);
const { Events } = require("discord.js")

module.exports = client => {
    client.on(Events.ClientReady, () => reqEvent("Ready.js")(client));
    reqEvent("interactionCreate.js")(client)
}