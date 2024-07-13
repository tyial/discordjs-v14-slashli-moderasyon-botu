const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('yardım')
    .setDescription('Yardım menüsünü gösterir.'),
  async run(client, interaction) {

    interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Yardım')
        .setDescription('Komutlar hakkında bilgi alın.')
        .addFields(
          {
            name: 'Komutlar', value: `
          </at:1227723626841899102> → Seçilen kullanıcıyı sunucudan atar.
          </ban:1226993711796457505> → Seçilen kullanıcıyı sunucudan engeller.
          </kilidi-aç:1227723626841899106> → Komutun kullanıldığı kanalın herkesin yazma yetkisini açar.
          </kilitle:1227723626841899103> → Komutun kullanıldığı kanalın herkesin yazma yetkisini kapatır.
          </rol-al:1227723626841899104> → Seçilen kullanıcıdan seçilen rolü alır.
          </rol-ver:1227723626841899099> → Seçilen kullanıcıya seçilen rolü verir.
          </sil:1227723626841899101> → Kanaldan yazılan miktarda mesaj silinir.
          </unban:1226993712236855338> → ID'sini yazdığınız kullanıcının sunucudaki engelini açar.
          </zamanaşımı:1227723626841899105> → Seçilen kullanıcıya seçilen zaman boyunca zamanaşımı uygular.
          `, inline: true
          }
        )]
    })
  }
}