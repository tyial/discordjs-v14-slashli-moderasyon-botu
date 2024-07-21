const { Client, GatewayIntentBits } = require("discord.js");
const Config = require("./Config.js");
require("advanced-logs");

const allIntents = Object.values(GatewayIntentBits);
const client = new Client({
    intents: [allIntents]
});

require("./Utils/eventLoader.js")(client)
require("./Utils/slashHandler.js")(client)

// ErrorHandler --------------------------------------------------------------
process.on('unhandledRejection', (reason, p) => {
    console.error(reason);
});
process.on("uncaughtException", (err, origin) => {
    console.error(' [AntiCrash] :: Uncaught Exception/Catch');
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.error(' [AntiCrash] :: Uncaught Exception/Catch (MONITOR)');
});
// ErrorHandler --------------------------------------------------------------

client.login(Config.Token);
