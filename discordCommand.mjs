import { REST, Routes, SlashCommandBuilder } from 'discord.js';
const TOKEN = 'TOKEN';
const CLIENT_ID = 'CLIENT_ID';



const commands = [
    {
        name: '업다운',
        description: '업다운 게임을 플레이합니다.',
        options: [
            {
                name: '명령어',
                description: "업다운 명령어를 확인하려면 이 곳에 '명령어' 를 입력하세요.",
                type: 3,
                require: true
            },
            {
                name: '정답',
                description: "정답을 맞춰보세요!",
                type: 10,
                require: true
            }
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}