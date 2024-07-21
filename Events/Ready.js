const { ActivityType } = require("discord.js")
require("advanced-logs")

module.exports = client => {

    const statuses = [
        { name: `${client.user.username} hizmete hazır.`, type: "WATCHING" },
        { name: `Tyial tarafından geliştirilmiştir.`, type: "PLAYING" },
        { name: `discord.js v14 Moderasyon Botu!`, type: "LISTENING" },
    ];

    console.success(`${client.user.username} adlı hesaba başarıyla bağlanıldı.`)
    let index = 0;

    setInterval(() => {
        const status = statuses[index];
        client.user.setPresence({
            activities: [{ name: status.name, type: status.type }],
            status: 'online'
        });

        index = (index + 1) % statuses.length;
    }, 10000);
};
