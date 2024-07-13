const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Belirtilen kullanıcının banını kaldırır.')
        .addStringOption(option =>
            option.setName('kullanıcı')
                .setDescription('Kullanıcının idsini yazınız.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),
    async run(client, interaction) {
        const mentioned = interaction.options.getString('kullanıcı');
        const guild = interaction.guild;
        const bannedUsers = await guild.bans.fetch();
        const bannedUser = bannedUsers.find(user => user.user.id === mentioned);

        if (!guild.members.me.permissions.has("BanMembers")) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                .setDescription("Bot, üyelerin yasaklanmasını kaldırma yetkisine sahip değil.")
                .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })], ephemeral: true
        });
        if (!bannedUser) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                .setDescription("Kullanıcı bulunamadı.")
                .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })], ephemeral: true
        })

        await guild.members.unban(mentioned)
        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055689381617754.png", name: "Başarılı!" })
                .setDescription(`${bannedUser.user.tag} kullanıcısının yasağı kaldırıldı.`)
                .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })]
        });
    }
};