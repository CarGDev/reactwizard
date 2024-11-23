const chalk = require('chalk');
const inquirer = require('inquirer');
const { openInTerminal } = require('./loginUtils/openInTerminal');
const { openInVSCode } = require('./loginUtils/openInVSCode');
const { openInNeovim } = require('./loginUtils/openInNeovim');

function askUserWhereToOpen(directory) {
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
          openInTerminal(directory);
          break;
        case 'VSCode':
          openInVSCode(directory);
          break;
        case 'Neovim':
          openInNeovim(directory);
          break;
        default:
          console.log(
            chalk.yellow(
              'Project setup complete. You can manually open the project if needed.'
            )
          );
      }
    });
}

module.exports = { askUserWhereToOpen };
