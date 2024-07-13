const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName("rol-al")
        .setDescription("Seçilen kullanıcıdan belirtilen rolü kaldırır.")
        .addUserOption(option =>
            option.setName("kullanıcı")
                .setDescription("Kullanıcıyı seçin.")
                .setRequired(true))
        .addRoleOption(option =>
            option.setName("rol")
                .setDescription("Rolü seçin.")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),
    async run(client, interaction) {
        const member = interaction.options.getMember("kullanıcı");
        const role = interaction.options.getRole("rol");

        if (member && member.id === interaction.user.id) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                    .setDescription("Sizden bir rolü alamam.")
                    .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
                ], ephemeral: true
            });
        }
        if (member && member.id === interaction.client.user.id) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                    .setDescription("Kendimden bir rolü alamam.")
                    .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
                ], ephemeral: true
            });
        }
        if (member && interaction.member.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                    .setDescription("Bu komutu kullanmak için gerekli yetkilere sahip değilsiniz veya eksik bir rolünüz bulunmaktadır.")
                    .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
                ], ephemeral: true
            });
        }

        member.roles.remove(role)
            .then(() => {
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor("Green")
                        .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055689381617754.png", name: "Başarılı!" })
                        .setDescription(`**${member}** adlı kullanıcıdan ${role} adlı rol alındı.`)
                        .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
                    ]
                });
            })
            .catch(() => {
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor("Red")
                        .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                        .setDescription("Kullanıcıdan rol alınırken bir sorun oluştu.")
                        .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })], ephemeral: true
                });
            });
    }
};