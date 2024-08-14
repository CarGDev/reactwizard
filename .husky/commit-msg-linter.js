const { exec, execSync } = require('child_process');
const { promises: fs } = require('fs');
const chalk = require('chalk');

const commitTypes = {
  feat: '✨',
  fix: '🐛',
  docs: '📚',
  style: '🎨',
  refactor: '🔨',
  test: '✅',
  chore: '🛠️',
};

const defaultEmoji = '🔖'; // Default emoji if the commit type is not found

async function run() {
  // Dynamically import the ES Module
  const ora = (await import('ora')).default;

  const spinner = ora('Running custom commit message check...').start();

  try {
    console.log(chalk.blue('🔍 Running custom commit message check...'));
    console.log();

    // Get the commit message file path from the command line arguments
    const commitMsgFile = process.argv[2];

    if (!commitMsgFile) {
      spinner.fail('❌ Error: Commit message file path not provided.');
      console.error(
        chalk.red('❌ Error: Commit message file path not provided.')
      );
      process.exit(1);
    }

    const commitMsg = (await fs.readFile(commitMsgFile, 'utf8')).trim();

    // Check for duplicate commit messages in the last 100 commits
    const duplicateCommitMsg = execSync(`git log -n 100 --pretty=format:%s`)
      .toString()
      .split('\n')
      .some((msg) => msg.trim() === commitMsg);

    if (duplicateCommitMsg) {
      spinner.fail('❌ Duplicate commit message detected.');
      console.error(
        chalk.red(
          '❌ Duplicate commit message detected. Please use a unique commit message.'
        )
      );
      console.log();
      process.exit(1);
    }

    spinner.succeed('✅ Message is not duplicated');
    console.log(chalk.green('✅ Message is not duplicated'));
    console.log();
  } catch (err) {
    spinner.fail('❌ Error running custom commit message check.');
    console.error(chalk.red('❌ Error:', err));
    process.exit(1);
  }

  spinner.start('Running commitlint...');

  try {
    console.log(chalk.blue('🔍 Running commitlint...'));
    console.log();

    const commitMsgFile = process.argv[2];

    if (!commitMsgFile) {
      spinner.fail('❌ Error: Commit message file path not provided.');
      console.error(
        chalk.red('❌ Error: Commit message file path not provided.')
      );
      process.exit(1);
    }

    const commitMsg = (await fs.readFile(commitMsgFile, 'utf8')).trim();

    // Run commitlint
    exec(
      `npx commitlint --edit ${commitMsgFile}`,
      async (error, stdout, stderr) => {
        if (error) {
          spinner.fail('❌ Commitlint check failed.');
          console.error(chalk.red(stdout || stderr));
          console.error(chalk.red('❌ Commitlint check failed.'));
          console.log();
          console.error(
            chalk.yellow(
              '💡 Hint: Commit message should follow the Conventional Commits standard.'
            )
          );
          console.error(
            chalk.yellow(
              '👀 See: https://www.conventionalcommits.org/en/v1.0.0/'
            )
          );
          console.error(chalk.yellow('📋 Examples:'));
          console.error(chalk.yellow('  feat: add a new feature'));
          console.error(chalk.yellow('  fix: fix a bug'));
          console.error(chalk.yellow('  docs: update documentation'));
          console.error(
            chalk.yellow(
              '  style: improve formatting, missing semi colons, etc'
            )
          );
          console.error(
            chalk.yellow(
              '  refactor: code change that neither fixes a bug nor adds a feature'
            )
          );
          console.error(chalk.yellow('  test: add or modify tests'));
          console.error(
            chalk.yellow(
              "  chore: maintain tasks that don't fit in other categories"
            )
          );
          process.exit(1);
        } else {
          spinner.succeed('✅ Commitlint check passed.');
          console.log(chalk.green('✅ Commitlint check passed.'));
          console.log(chalk.green(stdout));

          // Add emoji to the commit message
          const commitRegex =
            /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?:\s.+/;
          const match = commitMsg.match(commitRegex);

          if (match) {
            const commitType = match[1];
            const emoji = commitTypes[commitType] || defaultEmoji;
            const newCommitMsg = `${emoji} ${commitMsg}`;

            // Write the updated commit message back to the file
            await fs.writeFile(commitMsgFile, newCommitMsg + '\n', 'utf8');
            console.log(
              chalk.green('✅ Commit message updated with emoji:'),
              newCommitMsg
            );
          } else {
            const newCommitMsg = `${defaultEmoji} ${commitMsg}`;
            await fs.writeFile(commitMsgFile, newCommitMsg + '\n', 'utf8');
            console.log(
              chalk.yellow(
                '⚠️  Commit message did not match expected format, added default emoji:'
              ),
              newCommitMsg
            );
          }

          process.exit(0);
        }
      }
    );
  } catch (err) {
    spinner.fail('❌ Error running commitlint.');
    console.error(chalk.red('❌ Error:', err));
    process.exit(1);
  }
}

run();
