import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = 'TOKEN';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let isUpDownStart = false, upDownCnt = 0, upDownChance = 7, upDownAnswer;

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === '업다운') {
        try {
            let upDownCommand = interaction.options.getString('명령어');
            let upDownPlayerAnswer = interaction.options.getNumber('정답');

            if (!upDownCommand && !upDownPlayerAnswer) {
                await interaction.reply({ content: '명령어나 정답을 입력해주세요.', ephemeral: true });
            } else if (upDownCommand && upDownPlayerAnswer) {
                await interaction.reply({ content: '둘 중 하나만 입력해주세요.', ephemeral: true });
            } else if (upDownCommand == '명령어') {
                await interaction.reply({ content: upDownHelp(), ephemeral: true });
            } else if (upDownCommand == '시작하기') {
                if (!isUpDownStart) {
                    await interaction.reply('업다운 게임을 시작합니다! (기회 7번)\n1~100');
                    upDownAnswer = Math.floor(Math.random() * 99) + 1;
                    isUpDownStart = true;
                    upDownCnt = 0;
                    upDownChance = 7;
                } else {
                    await interaction.reply({ content: '이미 업다운 게임이 진행중 입니다.', ephemeral: true });
                    return;
                }
            } else if (upDownCommand == '포기하기') {
                if (isUpDownStart) {
                    await interaction.reply(interaction.user.displayName + '님이 업다운 게임을 포기하셨습니다.\n정답: ' + upDownAnswer);
                    isUpDownStart = false;
                    upDownCnt = 0;
                    upDownChance = 7;
                    upDownAnswer = 0;
                } else {
                    await interaction.reply({ content: '먼저, 업다운 게임을 시작 해주세요.', ephemeral: true });
                    return;
                }
            } else if (upDownCommand == '>정답보기') {
                await interaction.reply({ content: String(upDownAnswer), ephemeral: true });
            } else {
                if (isUpDownStart) {
                    if (upDownPlayerAnswer <= 0 || upDownPlayerAnswer > 100) {
                        await interaction.reply({ content: '1~100 중에 정답을 외쳐주세요!', ephemeral: true });
                    } else if (upDownPlayerAnswer == upDownAnswer) {
                        upDownCnt++;
                        upDownChance--;
                        await interaction.reply(interaction.user.displayName + " 님이 " + upDownCnt + "번 만에 정답을 맞혔습니다!\n정답 : " + upDownAnswer);
                        isUpDownStart = false;
                        upDownCnt = 0;
                        upDownChance = 7;
                        upDownAnswer = 0;
                    } else if (upDownCnt == 6) {
                        await interaction.reply("기회 7번을 모두 사용했습니다\n정답:" + upDownAnswer + "\nGAME OVER");
                        isUpDownStart = false;
                        upDownCnt = 0;
                        upDownChance = 7;
                        upDownAnswer = 0;
                    } else if (upDownPlayerAnswer < upDownAnswer) {
                        upDownCnt++;
                        upDownChance--;
                        await interaction.reply(upDownPlayerAnswer + " Up!\n남은기회:" + upDownChance + "번");
                    } else if (upDownPlayerAnswer > upDownAnswer) {
                        upDownCnt++;
                        upDownChance--;
                        await interaction.reply(upDownPlayerAnswer + " Down!\n남은기회:" + upDownChance + "번");
                    }
                } else {
                    await interaction.reply({ content: '먼저, 업다운 게임을 시작 해주세요.', ephemeral: true });
                }
            }
        } catch (e) {
            await interaction.reply('오류가 발생했습니다.\n' + e);
        }
    }

});

function upDownHelp() {
    let msg = '업다운 명령어​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n\n';
    const help = [
        '/업다운 명령어 - 업다운게임의 명령어를 봅니다.',
        '/업다운 시작하기 - 업다운게임을 시작합니다.',
        '/업다운 (1~100) - 업다운게임의 정답을 맞춥니다.("정답" 에서 입력해야합니다.)',
        '/업다운 포기하기 - 업다운게임을 포기하고 정답을 봅니다.',
    ];

    msg += help.join('\n');

    return msg;
}

client.login(TOKEN);