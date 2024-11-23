const inquirer = require('inquirer');

async function askProjectDetails() {
  return inquirer.prompt([
    { type: 'confirm', name: 'useHusky', message: 'Install Husky?' },
    { type: 'confirm', name: 'useAntd', message: 'Install Antd?' },
    { type: 'confirm', name: 'useRedux', message: 'Use Redux?' },

    { type: 'confirm', name: 'useModuleFederation', message: 'Use Module Federation Plugin?' },
    { type: 'list', name: 'language', message: 'Choose language:', choices: ['JavaScript', 'TypeScript'] },
    { type: 'list', name: 'testingFramework', message: 'Choose testing framework:', choices: ['Jest', 'Mocha'] },
    { type: 'list', name: 'styling', message: 'Choose styling option:', choices: ['CSS', 'SCSS', 'SASS', 'LESS'] },
    { type: 'list', name: 'modules', message: 'Use CSS Modules, styled-components, or emotion?', choices: ['Modules', 'styled-components', 'emotion'] },
  ]);
}

module.exports = { askProjectDetails };
