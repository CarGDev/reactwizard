const { execSync } = require('child_process');
const ora = require('ora');
const fs = require('fs');

function setupHusky(options) {
  const spinner = ora('🐶 Setting up Husky...').start();
  if (!fs.existsSync('.git')) {
    spinner.fail(
      '❌ Husky cannot be installed because this is not a Git repository.'
    );
    console.error(
      `The .git directory is missing. If your project is in a subfolder, ensure \`git init\` is run in the root directory. Otherwise, initialize Git manually by running \`git init\` and then install Husky with the following commands:

1. npx husky-init
2. npm install
3. npx husky add .husky/pre-commit \"npm test\"`
    );
    return;
  }
  execSync(
    `npx husky-init && npm install ${options.verbose ? '--verbose' : ''}`
  );
  execSync(
    `npx husky add .husky/pre-commit "npm test" ${options.verbose ? '--verbose' : ''}`
  );
  spinner.succeed('🐶 Husky set up.');
}

module.exports = { setupHusky };
