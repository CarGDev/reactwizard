const { exec, execSync } = require('child_process');
const { promises: fs } = require('fs');
const chalk = require('chalk');

async function runCommand(command, description) {
  // Dynamically import the ES Module
  const ora = (await import('ora')).default;

  const spinner = ora(`Running ${description}...`).start();

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        spinner.fail(`${description} failed.`);
        console.error(chalk.red(`❌ ${description} failed.`));
        console.error(chalk.red(stderr));
        reject(new Error(stderr));
      } else {
        spinner.succeed(`${description} passed.`);
        console.log(chalk.green(`✅ ${description} passed.`));
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function runLint() {
  try {
    await runCommand('npm run lint:prettier', 'Prettier check');
    //await runCommand('yarn lint:html', 'ESLint HTML report');
    console.log(chalk.green('🎉 All checks passed.'));
    process.exit(0);
  } catch (err) {
    console.error(chalk.red('❌ Lint checks failed.'));
    console.error(chalk.red('😢 Oh no! Your code is not pretty enough.'));
    console.error(chalk.red('Please fix the issues above and try again.'));
    console.error(
      chalk.yellow(
        `💡 Hint: You can run ${chalk.cyan('yarn prettier')} to automatically format your code.`
      )
    );
    process.exit(1);
  }
}

runLint();
