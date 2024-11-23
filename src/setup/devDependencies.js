const { execSync } = require('child_process');
const ora = require('ora');
const { devDeps } = require('./devDeps');

function installDevDependencies(options){
  const spinner = ora('🔄 Installing additional dev dependencies...').start();
  try {
    execSync(
      `npm install ${devDeps.join(' ')} ${options.verbose ? '--verbose' : ''}`
    );
    spinner.succeed('✅ Additional dev dependencies installed.');
  } catch (error) {
    spinner.fail('❌ Failed to install dependencies.');
    console.error(error);
  }
}

module.exports = { installDevDependencies };
