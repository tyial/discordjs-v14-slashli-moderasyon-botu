const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  structure: new SlashCommandBuilder()
    .setName("rol-ver")
    .setDescription("Etiketlediğiniz kişiye belirttiğiniz rolü verir.")
    .addUserOption(option =>
      option.setName('kullanıcı')
        .setDescription('Kullanıcıyı seçiniz.')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName("rol")
        .setDescription("Rolü seç.")
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
          .setDescription("Kendine rol veremezsin.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (member && member.id === interaction.client.user.id) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Kendime rol veremem.")
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

    member.roles.add(role)
      .then(() => interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Green")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055689381617754.png", name: "Başarılı!" })
          .setDescription(`**${member}** kullanıcıya ${role} adlı rol eklendi.`)
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ]
      }))
      .catch(() => interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Kullanıcıya rol eklenirken bir sorun oluştu.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })]
      }));
  }
};