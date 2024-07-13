const { Collection, Events } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = client => {
    client.slashInteractions = new Collection();

    const loadCommands = async () => {
        try {
            const commandFiles = fs.readdirSync(path.join(__dirname, "../Commands")).filter(file => file.endsWith(".js"));
            for (const file of commandFiles) {
                const cmd = require(`../Commands/${file}`);
                if (cmd?.structure?.name) {
                    client.slashInteractions.set(cmd.structure.name, { ...(cmd.structure || {}), run: (cmd.run || (() => { })) });
                } else {
                    console.log(`Komut yüklenemedi: ${file}`);
                }
            }
        } catch (err) {
            console.error("Komutlar yüklenirken bir hata oluştu:", err);
        }
    };

    client.on(Events.ClientReady, async () => {
        await loadCommands();

        const commands = client.slashInteractions.map(data => {
            return { dmPermission: false, ...data };
        });

        try {
            await client.application.commands.set(commands);
        } catch (error) {
            console.error("Slash komutları yüklenirken bir hata oluştu:", error);
        }
    });
};
