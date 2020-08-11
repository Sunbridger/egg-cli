const fs = require('fs');
const download = require('download-git-repo');
// 动画
const ora = require('ora');
const chalk = require('chalk');

module.exports = (name) => {
    const spinner = ora(chalk.blue('正在创建中🥚🥚🥚...'));
    spinner.start();
    download('https://github.com:Sunbridger/egg-cli-template#master', name, { clone: true }, function (err) {
        if (err) {
            spinner.fail(chalk.red('🥚项目创建失败请重试吧~'))
        } else {
            const packDir = `${name}/package.json`
            fs.readFile(packDir, 'utf8', (err, data) => {
                fs.writeFile(packDir, data.replace(/eggcliname/, name), () => {
                    process.exit(1)
                });
            });
            spinner.succeed(chalk.green('🥚项目创建成功'))
        }
    });
};
