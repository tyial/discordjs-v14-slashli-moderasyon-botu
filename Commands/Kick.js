const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('at')
    .setDescription('Belirteceğiniz kullanıcıyı sunucudan atar.')
    .addUserOption(option =>
      option.setName('kullanıcı')
        .setDescription('Kullanıcıyı etiketleyiniz.')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),
  async run(client, interaction) {
    const mentioned = interaction.options.getUser('kullanıcı');
    const guild = interaction.guild;
    const memberToKick = await guild.members.fetch(mentioned).catch(() => null);
    const authorMember = interaction.member;
    const botMember = guild.members.me;
    const gowner = interaction.guild.ownerId();

    if (!memberToKick) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Sunucuda bu kullanıcıyı bulamadım.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (!guild.members.me.permissions.has("KickMembers")) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Bot, üyeleri atma yetkisine sahip değil.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })], ephemeral: true
      });
    }

    if (memberToKick.id === authorMember.id) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Kendini atamazsın!")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })], ephemeral: true
      });
    }

    if (memberToKick.id === gowner) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Sunucu sahibini atamazsın!")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),], ephemeral: true
      });
    }

    if (authorMember.id !== gowner && !authorMember.roles.cache.some(role => role.position > memberToKick.roles.highest.position)) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Bu kullanıcıyı atmak için yeterli yetkiniz yok.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })
        ], ephemeral: true
      });
    }

    if (memberToKick === botMember) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Kendimi atamam.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (!botMember.roles.cache.some(role => role.position > memberToKick.roles.highest.position)) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Bu kullanıcıyı atmak için yeterli yetkim yok.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),], ephemeral: true
      });
    }

    if (authorMember.roles.cache.size === memberToKick.roles.cache.size && authorMember.roles.cache.every(role => memberToKick.roles.cache.has(role.id))) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Sizinle aynı roldeki bir kullanıcıyı atamazsınız.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),], ephemeral: true
      });
    }

    if (botMember.roles.cache.size === memberToKick.roles.cache.size && botMember.roles.cache.every(role => memberToKick.roles.cache.has(role.id))) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Benimle aynı roldeki bir kullanıcıyı atamam.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),], ephemeral: true
      });
    }

    await memberToKick.kick()
      .then(() => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055689381617754.png", name: "Başarılı!" })
            .setDescription(`**${memberToKick.user.tag}** adlı kullanıcı başarıyla atıldı.`)
            .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),]
        })
      })
      .catch(() => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
            .setDescription("Üyeyi atarken bir sorun oluştu.")
            .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })]
        })
      });
  }
};
