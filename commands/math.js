const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(process.env.APPID);
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

module.exports = {
    data: new SlashCommandBuilder()
        .setName('solve')
        .setDescription('Type your equation for the bot to solve for you!')
        .addStringOption(option =>
            option.setName('equation')
                  .setDescription('The math equation')
                  .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString('equation');
        const fields = []

        waApi.getFull(input).then(result => {
            result.pods.forEach(pod => {
                let value = pod.subpods.map(subpod => subpod.plaintext).join('\n');
                // embed field value can't has a empty string
                if (value != '') fields.push({ name: pod.title, value: value });
            });
            console.log(fields);

            // a MessageEmbed object
            const outputEmbed = {
                color: 0x0099ff,
                author: {
                    name: "Qu1etboy's bot",
                },
                fields: fields,
                timestamp: new Date(),
                footer: {
                    text: 'Powered by WolframAlpha' 
                }
            }

            // console.log(output);
            interaction.reply({ embeds: [outputEmbed]});

        }).catch((error) => {
            interaction.reply('Invalid math equation');
            console.error(error);
        });
    },
};