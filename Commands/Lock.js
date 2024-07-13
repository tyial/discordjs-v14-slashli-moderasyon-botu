const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('kilitle')
    .setDescription('Kanalı kilitler.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),
  async run(client, interaction) {
    const channel = interaction.channel;

    if (!channel.permissionsFor(interaction.guild.roles.everyone).has("SendMessages")) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Kanal zaten kilitli!")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })], ephemeral: true
      });
    }

    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: false
    })
      .then(() => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055689381617754.png", name: "Başarılı!" })
            .setDescription("Kanal başarıyla kilitlendi!")
            .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })]
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
