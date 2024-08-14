#!/usr/bin/env node

const { execSync } = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');

async function run() {
  try {
    // Prevent the script from running during npm lifecycle hooks
    if (process.env.npm_lifecycle_event) {
      console.log(
        chalk.yellow(
          '⚠️  Script is running in an npm lifecycle hook, exiting...'
        )
      );
      return;
    }

    // Check if working directory is clean
    const status = execSync('git status --porcelain').toString().trim();
    if (status) {
      console.error(
        chalk.red(
          '❌ Error: Your working directory is not clean. Please commit or stash your changes first.'
        )
      );
      process.exit(1);
    }

    // Pull the latest changes
    console.log(
      chalk.blue('🔄 Pulling the latest changes from the remote repository...')
    );
    execSync('git pull origin main', { stdio: 'inherit' });

    // Ask the user to choose the version bump type
    const { versionType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'versionType',
        message: '🔢 Select the type of version bump:',
        choices: ['patch', 'minor', 'major'],
      },
    ]);

    // Bump the version
    console.log(chalk.blue(`📦 Bumping the ${versionType} version...`));
    execSync(`npm version ${versionType}`, { stdio: 'inherit' });

    // Commit and push changes
    console.log(chalk.blue('🚀 Pushing changes to the remote repository...'));
    execSync('git push origin main --follow-tags', { stdio: 'inherit' });

    // Publish the package
    console.log(chalk.blue('📤 Publishing the package to npm...'));
    execSync('npm publish', { stdio: 'inherit' });

    console.log(
      chalk.green(`✅ 🚀 Successfully released a new ${versionType} version!`)
    );

    // Exit the process to avoid any potential loops
    process.exit(0);
  } catch (error) {
    console.error(
      chalk.red('❌ An error occurred during the release process:'),
      error.message
    );
    process.exit(1);
  }
}

run();
