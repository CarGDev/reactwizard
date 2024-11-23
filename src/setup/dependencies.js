const { execSync } = require('child_process');
const ora = require('ora');
const { deps } = require('./deps');

function installDependencies(userInput, options) {
  const spinner = ora('🔄 Installing dependencies...').start();
  try {
    if (userInput.useAntd) {
      deps.push('antd');
    }
    if (userInput.useRedux) {
      deps.push('@reduxjs/toolkit');
      deps.push('react-redux');
      deps.push('redux');
    }
    execSync(
      `npm install ${deps.join(' ')} ${options.verbose ? '--verbose' : ''}`
    );
    spinner.succeed('✅ Dependencies installed.');
  } catch (error) {
    spinner.fail('❌ Failed to install dependencies.');
    console.error(error);
  }
}

module.exports = { installDependencies };
