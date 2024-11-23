const { execSync } = require('child_process');
const ora = require('ora');

function setupHusky(options) {
  const spinner = ora('🐶 Setting up Husky...').start();
  execSync(
    `npx husky-init && npm install ${options.verbose ? '--verbose' : ''}`
  );
  execSync(
    `npx husky add .husky/pre-commit "npm test" ${options.verbose ? '--verbose' : ''}`
  );
  spinner.succeed('🐶 Husky set up.');
}

module.exports = { setupHusky };
