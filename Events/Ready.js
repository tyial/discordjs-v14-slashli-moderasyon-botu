require("advanced-logs")

module.exports = client => {

    const statuses = [
        { name: `${client.user.username} hizmete hazır.`, type: "WATCHING" },
        { name: `Tyial tarafından geliştirilmiştir.`, type: "PLAYING" },
        { name: `discord.js v14 Moderasyon Botu!`, type: "LISTENING" },
    ];

    let currentIndex = 0;

    console.success(`${client.user.username} adlı hesaba başarıyla bağlanıldı.`)

    setInterval(() => {
        const status = statuses[currentIndex];
        client.user.setPresence({ activities: [status], status: 'dnd' });
        currentIndex = (currentIndex + 1) % statuses.length;
    }, 5000);
};