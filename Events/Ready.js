const { ActivityType } = require("discord.js")
require("advanced-logs")

module.exports = client => {

    console.success(`${client.user.username} adlı hesaba başarıyla bağlanıldı.`)
    const statuses = [
        { name: `${client.user.username} hizmete hazır.`, type: ActivityType.Watching },
        { name: `Tyial tarafından geliştirilmiştir.`, type: ActivityType.Listening },
        { name: `discord.js v14 Moderasyon Botu!`, type: ActivityType.Playing },
    ];

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
