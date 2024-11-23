// Purpose: Initialize a Git repository and run Git commands.
const { execSync } = require('child_process');
const ora = require('ora');

async function setupGit(options) {
  const spinner = ora('🔧 Running Git commands...').start();

  try {
    execSync(`git init ${options.verbose ? '--verbose' : ''}`);
    spinner.succeed('✅ Git commands executed successfully.');
  } catch (error) {
    spinner.fail('❌ Failed to execute Git commands.');
    console.error(error);
  }
}

module.exports = { setupGit };
