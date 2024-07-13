const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Belirteceğiniz kullanıcıyı banlar.')
    .addUserOption(option =>
      option.setName('kullanıcı')
        .setDescription('Kullanıcıyı seçiniz.')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),
  async run(client, interaction) {
    const mentioned = interaction.options.getUser('kullanıcı');
    const guild = interaction.guild;
    const memberToBan = await guild.members.fetch(mentioned).catch(() => null);
    const authorMember = interaction.member;
    const botMember = guild.members.me;
    const gowner = await interaction.guild.fetchOwner();

    if (!memberToBan) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Sunucuda bu kullanıcıyı bulamadım.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (!guild.me.permissions.has("BAN_MEMBERS")) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Bot, üyeleri banlama yetkisine sahip değil.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (memberToBan.id === authorMember.id) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Kendini banlayamazsın!")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),], ephemeral: true
      });
    }

    if (memberToBan.id === gowner.id) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Sunucu sahibini banlayamazsın!")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (authorMember.id !== gowner.id && !authorMember.roles.cache.some(role => role.position > memberToBan.roles.highest.position)) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Bu kullanıcıyı banlamak için yeterli yetkiniz yok.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (memberToBan === botMember) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Kendimi banlayamam.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (!botMember.roles.cache.some(role => role.position > memberToBan.roles.highest.position)) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Bu kullanıcıyı banlamak için yeterli yetkim yok.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (authorMember.roles.cache.size === memberToBan.roles.cache.size && authorMember.roles.cache.every(role => memberToBan.roles.cache.has(role.id))) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Sizinle aynı roldeki bir kullanıcıyı banlayamazsınız.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    if (botMember.roles.cache.size === memberToBan.roles.cache.size && botMember.roles.cache.every(role => memberToBan.roles.cache.has(role.id))) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor("Red")
          .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
          .setDescription("Benimle aynı roldeki bir kullanıcıyı banlayamam.")
          .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
        ], ephemeral: true
      });
    }

    await memberToBan.ban()
      .then(() => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055689381617754.png", name: "Başarılı!" })
            .setDescription(`**${memberToBan.user.tag}** adlı kullanıcı başarıyla banlandı.`)
            .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` }),
          ]
        })
      })
      .catch(() => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ iconURL: "https://cdn.discordapp.com/emojis/1170055691319386223.png", name: "Hata!" })
            .setDescription("Üyeyi banlarken bir sorun oluştu.")
            .setFooter({ text: `${new Date().toLocaleString("tr-TR", { hour12: false, timezone: "Europe/Istanbul" })} tarihinde komut kullanıldı.` })]
        })
      });
  }
};