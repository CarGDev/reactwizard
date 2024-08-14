const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

async function run() {
  // Dynamically import the ES Module
  const ora = (await import('ora')).default;

  const spinner = ora('✨ Checking code formatting...').start();

  try {
    const { stdout } = await execPromise(
      'npm run pretty-quick --check . --config .prettierrc'
    );
    spinner.succeed('✅ Code formatting check passed.');
    console.log(stdout);
  } catch (error) {
    spinner.fail('❌ Code formatting check failed.');
    console.error(error.message);
    process.exit(1);
  }
}

run();
