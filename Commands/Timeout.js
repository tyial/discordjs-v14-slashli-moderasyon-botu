const ms = require("ms");
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName("zamanaşımı")
        .setDescription("Seçilen kişiye belirttiğiniz sürelik zamanaşımı uygular.")
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Kullanıcıyı seçin.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName("süre")
                .setDescription("Bir süre belirtin. 1m, 1h, 1d ( 1m = 1 Dakika, 1h = 1 Saat, 1d = 1 Gün )")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers),
    async run(client, interaction) {
        const member = interaction.options.getMember("kullanıcı");
        const time = interaction.options.getString("süre");

        if (member && member.id === interaction.user.id) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                .setDescription("Kendine zamamnaşımı uygulattıramazsın.")
                .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
            ], ephemeral: true
        });
        if (member && member.id === interaction.client.user.id) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                .setDescription("Kendime zamanaşımı uygulayamam.")
                .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
            ], ephemeral: true
        });
        if (member && interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                .setDescription("Bu komutu kullanmak için gerekli yetkilere sahip değilsiniz veya eksik bir rolünüz bulunmaktadır.")
                .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
            ], ephemeral: true
        });

        member.timeout(ms(time))
            .then(() => {
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor("Green")
                        .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055689381617754.png", name: "Başarılı!" })
                        .setDescription(`**${member.toString()}** kullanıcısına başarıyla zamanışımı uygulandı.`)
                        .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
                    ]
                })
            })
            .catch((err) => {
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor("Red")
                        .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
                        .setDescription("Kullanıcıya zamanaşımı uygulanırken bir sorun oluştu.")
                        .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })], ephemeral: true
                })
            });
    }
};
