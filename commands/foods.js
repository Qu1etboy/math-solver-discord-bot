const { SlashCommandBuilder } = require('@discordjs/builders');

const randomNum = () => {
    return Math.floor(Math.random()*5);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('หิวข้าว')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        foods = ['ข้าวมันไก่', 'ข้าวกะเพราหมูไข่ดาว', 'ข้าวไข่เจียว', 'พิซซ่า', 'ไก่ทอด']
        await interaction.reply(foods[randomNum()]);
    },
};