const { execSync } = require('child_process');

(async () => {
  const ora = (await import('ora')).default;
  const spinner = ora('Running Prettier...').start();

  try {
    // Run Prettier
    execSync('npm run prettier', { stdio: 'inherit' });
    spinner.succeed('Prettier has formatted the files.');

    // Check for changes
    spinner.start('Checking for changes...');
    const changes = execSync('git status --porcelain', { encoding: 'utf-8' });

    if (changes) {
      spinner.succeed('Changes detected.');
      // Read the latest commit message to ensure uniqueness
      const latestCommitMessage = execSync(`git log -n 100 --pretty=format:%s`)
        .toString()
        .split('\n');

      // Generate a unique commit message
      let commitMessage = 'style: format with prettier';
      if (latestCommitMessage.includes(commitMessage)) {
        commitMessage = `style: format with prettier ${Date.now()}`;
      }

      // Add and commit changes
      spinner.start('Adding changes to Git...');
      execSync('git add .', { stdio: 'inherit' });
      spinner.succeed('Changes added to Git.');

      spinner.start('Committing changes...');
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      spinner.succeed('Changes committed.');
    } else {
      spinner.info('No changes detected by Prettier.');
    }
  } catch (error) {
    spinner.fail('An error occurred while running Prettier.');
    console.error(error);
    process.exit(1);
  }
})();
