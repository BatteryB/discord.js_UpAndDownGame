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
                description: "업다운게임의 명령어를 실행합니다.",
                type: 3,
                required: false,
                choices: [
                    {
                        name: '시작하기',
                        description: '업다운 게임을 시작합니다.',
                        value: '시작하기'
                    },
                    {
                        name: '포기하기',
                        description: '업다운 게임의 정답을 확인하고 포기합니다.',
                        value: '포기하기'
                    }
                ]
            },
            {
                name: '정답',
                description: "정답을 맞춰보세요!",
                type: 10,
                required: false,
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