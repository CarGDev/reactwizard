const { execSync } = require('child_process');
const ora = require('ora');
const { deps } = require('./deps');

function installDependencies(userInput, options) {
  const spinner = ora('🔄 Installing dependencies...').start();
  try {
    switch (userInput.uiFramework) {
      case 'Ant Design':
        deps.push('antd');
        break;
      case 'Material UI':
        deps.push('@mui/material');
        deps.push('@emotion/react');
        deps.push('@emotion/styled');
        break;
      case 'Chakra UI':
        deps.push('@chakra-ui/react');
        deps.push('@emotion/react');
        deps.push('@emotion/styled');
        deps.push('framer-motion');
        break;
      case 'Radix UI':
        deps.push('@radix-ui/react-icons');
        break;
      default:
        break;
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
