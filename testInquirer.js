const inquirer = require('inquirer');
const chalk = require('chalk');

function testInquirer() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'openIn',
        message: 'Where would you like to open the project?',
        choices: ['Terminal', 'VSCode', 'Neovim', 'None'],
      },
    ])
    .then((answers) => {
      switch (answers.openIn) {
        case 'Terminal':
          console.log(chalk.green('Opening in Terminal...'));
          break;
        case 'VSCode':
          console.log(chalk.blue('Opening in VSCode...'));
          break;
        case 'Neovim':
          console.log(chalk.magenta('Opening in Neovim...'));
          break;
        default:
          console.log(chalk.yellow('No action taken.'));
      }
    })
    .catch((error) => {
      console.log(chalk.red('An error occurred:'), error);
    });
}

testInquirer();
