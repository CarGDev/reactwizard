#!/usr/bin/env node

const { execSync } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const commander = require('commander');
const ora = require('ora');
const packageJson = require('./package.json');
const fsExtra = require('fs-extra');
const inquirer = require('inquirer');
const { spawn } = require('child_process');
const os = require('os');

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')}`)
  .action((projectDirectory) => {
    createApp(projectDirectory);
  })
  .parse(process.argv);

function createApp(projectDirectory) {
  console.clear(); // Clears the console before anything else
  const root = path.resolve(projectDirectory);

  // Check if the directory already exists
  if (fs.existsSync(root)) {
    console.clear();
    console.log(chalk.red.bold('❌ Error: Directory already exists!'));
    console.log(chalk.yellow(`\nThe directory ${chalk.blue(root)} already exists.`));
    console.log(chalk.cyan('Please choose a different project name or delete the existing directory.'));
    return; // Exit the function if the directory exists
  }

  const appName = path.basename(root);

  console.log(`🚀 Creating a new React app in ${chalk.green(root)}...`);

  fs.mkdirSync(root);
  process.chdir(root);

  const spinner = ora('⏳ Installing packages. This might take a couple of minutes.').start();

  execSync('npx create-react-app . --template typescript', { stdio: 'ignore' });

  spinner.succeed('📦 Packages installed successfully.');

  installDependencies();
  installDevDependencies();
  setupAntd();
  setupSass();
  setupTesting();
  setupHusky();
  setupCommitlint();
  setupRedux();
  createAtomicStructure();
  updatePackageJson();
  copyPreConfiguredFiles(root); // Copy pre-configured files like prettier-commit.js
  deletePreCommitHook(); // Delete the .husky/pre-commit hook
  runGitCommands(); // Run git add . and git commit -m "feat: happy coding"
  runPrettierCommit(); // Run npm run prettier:commit
  printCommandSummary(); // Print the command summary
  console.log(chalk.green('🎉 All done! Happy coding.'));
  // Ask the user where they want to open the project
  askUserWhereToOpen(root);
}

function askUserWhereToOpen(directory) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'openIn',
        message: 'Where would you like to open the project?',
        choices: ['Terminal', 'VSCode', 'Neovim', 'None'],
      },
    ])
    .then((answers) => {
      switch (answers.openIn) {
        case 'Terminal':
          openInTerminal(directory);
          break;
        case 'VSCode':
          openInVSCode(directory);
          break;
        case 'Neovim':
          openInNeovim(directory);
          break;
        default:
          console.log(chalk.yellow('Project setup complete. You can manually open the project if needed.'));
      }
    });
}

function openInTerminal(directory) {
  const platform = os.platform();

  if (platform === 'darwin') {
    // macOS
    spawn('open', ['-a', 'Terminal', directory]);
  } else if (platform === 'win32') {
    // Windows
    spawn('cmd.exe', ['/c', 'start', 'cmd.exe', '/K', `cd /d ${directory}`], { shell: true });
  } else if (platform === 'linux') {
    // Linux
    spawn('gnome-terminal', ['--working-directory=' + directory]);
  } else {
    console.log(chalk.red('Unsupported platform. Please manually navigate to the directory.'));
  }
}

function openInVSCode(directory) {
  spawn('code', [directory], { stdio: 'inherit' });
}

function openInNeovim(directory) {
  spawn('nvim', [directory], { stdio: 'inherit' });
}

function printCommandSummary() {
  console.log(chalk.yellow('\n🔑 Project Setup Summary:'));
  console.log(chalk.cyan('\nAvailable Commands:'));

  console.log(chalk.green('1. 🚀 npm start'));
  console.log(chalk.white('   Starts the development server with Webpack. The project is served using Webpack Dev Server with the configuration specified in webpack.config.js.'));

  console.log(chalk.green('\n2. 🛠️ npm run build'));
  console.log(chalk.white('   Builds the project for production. Webpack compiles the project and outputs the optimized bundle in the /dist directory.'));

  console.log(chalk.green('\n3. 🧪 npm test'));
  console.log(chalk.white('   Placeholder for running tests. Currently, it does not run any tests but can be customized to run Jest or other test suites.'));

  console.log(chalk.green('\n4. 🧪 npm run test:dev'));
  console.log(chalk.white('   Runs tests in watch mode using React Scripts. Suitable for a test-driven development approach.'));

  console.log(chalk.green('\n5. 🎨 npm run pretty-quick'));
  console.log(chalk.white('   Formats all staged files using Prettier. Ensures that code is consistently formatted before committing.'));

  console.log(chalk.green('\n6. 🔍 npm run lint:prettier'));
  console.log(chalk.white('   Checks the format of the entire codebase using a custom script. It can be used to ensure that all files adhere to Prettier’s formatting rules.'));

  console.log(chalk.green('\n7. ✨ npm run prettier'));
  console.log(chalk.white('   Formats the entire codebase using Prettier based on the configuration in .prettierrc.'));

  console.log(chalk.green('\n8. ✨ npm run prettier:commit'));
  console.log(chalk.white('   Applies Prettier formatting to staged files before committing. Ensures that committed code is properly formatted.'));

  console.log(chalk.green('\n9. 🚨 npm run eject'));
  console.log(chalk.white('   Ejects the project from Create React App. This command exposes the underlying configuration files for full control but cannot be undone.'));

  console.log(chalk.green('\n10. 🛡️ npm run prepare'));
  console.log(chalk.white('   Installs Husky hooks. This script is automatically run after dependencies are installed, setting up Git hooks for the project.'));

  console.log(chalk.yellow('\n🎉 Your project is ready! Use the above commands to start working on your new React app.'));
}

function runPrettierCommit() {
  const spinner = ora('🎨 Running prettier:commit script...').start();

  try {
    execSync('npm run prettier:commit', { stdio: 'ignore' });
    spinner.succeed('✅ Prettier commit script executed successfully.');
  } catch (error) {
    spinner.fail('❌ Failed to run prettier:commit script.');
    console.error(error);
  }
}

function runGitCommands() {
  const spinner = ora('🔧 Running Git commands...').start();

  try {
    execSync('git add .', { stdio: 'ignore' });
    execSync('git commit -m "feat: happy coding"', { stdio: 'ignore' });
    spinner.succeed('✅ Git commands executed successfully.');
  } catch (error) {
    spinner.fail('❌ Failed to execute Git commands.');
    console.error(error);
  }
}

function deletePreCommitHook() {
  const spinner = ora('🗑️ Deleting .husky/pre-commit hook...').start();

  const preCommitPath = path.resolve('.husky', 'pre-commit');
  if (fs.existsSync(preCommitPath)) {
    fs.unlinkSync(preCommitPath);
    spinner.succeed('🗑️ .husky/pre-commit hook deleted.');
  } else {
    spinner.warn('⚠️ .husky/pre-commit hook not found.');
  }
}

function updatePackageJson() {
  const spinner = ora('📝 Updating package.json with custom scripts...').start();

  const packageJsonPath = path.resolve('package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.scripts = {
    "start": "webpack serve --config webpack.config.js --mode development",
    "build": "webpack --config webpack.config.js --mode production",
    "test": "echo \"Error: no test specified\" && exit 0",
    "test:dev": "react-scripts test",
    "pretty-quick": "pretty-quick",
    "lint:prettier": "node check-format.js",
    "prettier": "prettier --write . --config .prettierrc",
    "prettier:commit": "node prettier-commit.js",
    "eject": "react-scripts eject",
    "prepare": "husky install"
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  spinner.succeed('📝 package.json updated with custom scripts.');
}

function copyPreConfiguredFiles(destinationPath) {
  const spinner = ora('📁 Copying pre-configured files...').start();

  const filesToCopy = [
    { src: path.resolve(__dirname, 'pre-files/check-format.js'), dest: path.join(destinationPath, 'check-format.js') },
    { src: path.resolve(__dirname, 'pre-files/commit-msg-linter.js'), dest: path.join(destinationPath, '.husky/commit-msg-linter.js') },
    { src: path.resolve(__dirname, 'pre-files/lint-check.js'), dest: path.join(destinationPath, '.husky/lint-check.js') },
    { src: path.resolve(__dirname, 'pre-files/prettier-commit.js'), dest: path.join(destinationPath, 'prettier-commit.js') },
    { src: path.resolve(__dirname, 'pre-files/webpack.config.js'), dest: path.join(destinationPath, 'webpack.config.js') },
    { src: path.resolve(__dirname, 'pre-files/.babelrc'), dest: path.join(destinationPath, '.babelrc') },
    { src: path.resolve(__dirname, 'pre-files/.eslintrc.js'), dest: path.join(destinationPath, '.eslintrc.js') },
    { src: path.resolve(__dirname, 'pre-files/.prettierrc'), dest: path.join(destinationPath, '.prettierrc') },
    // Add more files here if needed
  ];

  filesToCopy.forEach(file => {
    fs.copyFileSync(file.src, file.dest);
  });

  // Recursively copy all files from pre-files/src/* to destinationPath/src/
  const srcPath = path.resolve(__dirname, 'pre-files/src');
  const destPath = path.join(destinationPath, 'src');
  fsExtra.copySync(srcPath, destPath);

  spinner.succeed('📁 Pre-configured files copied.');
}

function installDependencies() {
  const spinner = ora('🔄 Installing additional dependencies...').start();
  execSync('npm install @babel/core @babel/preset-env @babel/preset-react @reduxjs/toolkit @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest @types/node @types/react @types/react-dom ajv antd babel-loader css-loader jest playwright react react-dom react-redux react-scripts redux sass sass-loader style-loader typescript web-vitals webpack webpack-cli', { stdio: 'ignore' });
  spinner.succeed('✅ Additional dependencies installed.');
}

function installDevDependencies() {
  const spinner = ora('🔄 Installing additional dev dependencies...').start();
  execSync('npm install --save-dev @babel/plugin-proposal-private-property-in-object ora prettier @commitlint/cli @commitlint/config-conventional @svgr/webpack dotenv dotenv-webpack husky url-loader webpack-dev-server pretty-quick', { stdio: 'ignore' });
  spinner.succeed('✅ Additional dev dependencies installed.');
}

function setupAntd() {
  const spinner = ora('🎨 Setting up Ant Design...').start();
  const indexCssPath = path.resolve('src', 'index.css');
  const indexCss = fs.readFileSync(indexCssPath, 'utf8');
  fs.writeFileSync(indexCssPath, `@import '~antd/dist/antd.css';\n${indexCss}`);
  spinner.succeed('🎨 Ant Design set up.');
}

function setupSass() {
  const spinner = ora('🎨 Setting up SASS...').start();
  const appCssPath = path.resolve('src', 'App.css');
  fs.renameSync(appCssPath, appCssPath.replace('.css', '.scss'));
  spinner.succeed('🎨 SASS set up.');
}

function setupTesting() {
  const spinner = ora('🧪 Setting up Playwright and Jest...').start();
  execSync('npx playwright install', { stdio: 'ignore' });
  spinner.succeed('🧪 Playwright and Jest set up.');
}

function setupHusky() {
  const spinner = ora('🐶 Setting up Husky...').start();
  execSync('npx husky-init && npm install', { stdio: 'ignore' });
  execSync('npx husky add .husky/pre-commit "npm test"', { stdio: 'ignore' });
  spinner.succeed('🐶 Husky set up.');
}

function setupCommitlint() {
  const spinner = ora('🔍 Setting up Commitlint...').start();
  const commitMsg = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
node ./.husky/commit-msg-linter.js "$1"`
  const commitLintMsgLinter = `module.exports = {
  extends: ['@commitlint/config-conventional'],
};`
  const prePush = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

node .husky/lint-check.js`

  execSync('npm install @commitlint/{config-conventional,cli} --save-dev', { stdio: 'ignore' });
  execSync('touch .husky/commit-msg', { stdio: 'ignore' });
  execSync('touch .husky/pre-push', { stdio: 'ignore' });
  execSync('chmod +x .husky/commit-msg', { stdio: 'ignore' });
  execSync('chmod +x .husky/pre-push', { stdio: 'ignore' });

  fs.writeFileSync(path.resolve('.husky/commit-msg'), commitMsg);
  fs.writeFileSync(path.resolve('commitlint.config.js'), commitLintMsgLinter);
  fs.writeFileSync(path.resolve('.husky/pre-push'), prePush);
  spinner.succeed('🔍 Commitlint set up.');
}

function setupRedux() {
  const spinner = ora('🛠️ Setting up Redux...').start();

  const reduxStructure = [
    'src/store',
    'src/store/slices',
    'src/store/middleware',
    'src/store/selectors'
  ];

  reduxStructure.forEach(dir => {
    fs.mkdirSync(dir, { recursive: true});
  });

  const storeIndex = `
import { configureStore } from ‘@reduxjs/toolkit’;

const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
  `;
  fs.writeFileSync(path.resolve('src/store/index.ts'), storeIndex);

  const appTsxPath = path.resolve('src/App.tsx');
  let appTsx = fs.readFileSync(appTsxPath, 'utf8');
  appTsx = `
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      ${appTsx}
    </Provider>
  );
};

export default App;
  `;
  fs.writeFileSync(appTsxPath, appTsx);

  spinner.succeed('🛠️ Redux set up.');
}

function createAtomicStructure() {
  const spinner = ora('🏗️ Creating atomic design structure…').start();
  const atomicStructure = [
    'src/components/atoms',
    'src/components/molecules',
    'src/components/organisms',
    'src/components/templates',
    'src/components/pages'
  ];

  atomicStructure.forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
  });
  spinner.succeed('🏗️ Atomic design structure created.');
}

if (!program.args.length) {
  program.help();
}

module.exports = {
  printCommandSummary,
  installDependencies,
  // Export other functions as needed
};
