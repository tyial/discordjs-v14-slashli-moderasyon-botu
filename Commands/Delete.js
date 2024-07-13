const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('sil')
    .setDescription('Belirtilen miktarda mesajları siler.')
    .addIntegerOption(option =>
      option.setName('miktar')
        .setDescription('Silinecek mesaj miktarını belirtin.')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
  async run(client, interaction) {
    const amount = interaction.options.getInteger('miktar');

    if (amount <= 0 || amount > 100) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Miktar 0 ile 100 arasında olmalıdır.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    const fetchedMessages = await interaction.channel.messages.fetch({ limit: amount }).catch(() => null);
    if (!fetchedMessages || fetchedMessages.size === 0) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Bu kanalda temizlenecek mesaj bulunamadı.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    await interaction.channel.bulkDelete(amount, true)
      .then(messages => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055689381617754.png", name: "Başarılı!" })
            .setDescription(`${messages.size} başarıyla adet mesaj silindi.`)
            .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
          ]
        });
      })
      .catch(() => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
            .setDescription("Bir hata oluştu.")
            .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })]
        });
      });
  }
};
