const fs = require('fs');
const path = require('path');
const ora = require('ora');
const { execSync } = require('child_process');

function setupTesting(userInput) {
  const { testingFramework } = userInput;
  const spinner = ora('🧪 Setting up testing framework...').start();

  try {
    const testingMap = {
      Jest: {
        dependency: 'jest @types/jest ts-jest',
        configFile: 'jest.config.js',
      },
      Mocha: {
        dependency: 'mocha chai @types/mocha',
        configFile: 'mocha.opts',
      },
    };

    // Ensure testingFramework is valid
    if (!testingMap[testingFramework]) {
      spinner.fail(`❌ Unsupported testing framework: ${testingFramework}`);
      return;
    }

    const { dependency, configFile } = testingMap[testingFramework];

    // Install necessary dependencies for the chosen testing framework
    spinner.text = `📦 Installing ${testingFramework} and related packages...`;
    execSync(`npm install --save-dev ${dependency}`, { stdio: 'inherit' });

    // Create a configuration file for the testing framework
    const configPath = path.resolve(configFile);

    let configContent = '';
    if (testingFramework === 'Jest') {
      configContent = `module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};`;
    } else if (testingFramework === 'Mocha') {
      configContent = `--require ts-node/register
--recursive
`;
    }

    fs.writeFileSync(configPath, configContent);
    spinner.succeed(
      `🧪 ${testingFramework} set up successfully with configuration file: ${configFile}`
    );

    // Add test script to package.json
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.scripts = {
      ...packageJson.scripts,
      test: testingFramework === 'Jest' ? 'jest' : 'mocha',
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    spinner.fail('❌ Failed to set up testing framework.');
    console.error(error);
  }
}

module.exports = { setupTesting };
