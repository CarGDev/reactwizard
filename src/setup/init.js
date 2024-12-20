const path = require('path');
const { execSync } = require('child_process');
const ora = require('ora');
const fs = require('fs');
const { installDependencies } = require('./dependencies');
const { installDevDependencies } = require('./devDependencies');
const { setupHusky } = require('./husky');
const { setupRedux } = require('./redux');
const { setupStyles } = require('./styles');
const { setupGit } = require('./gitInit');
const { setupTesting } = require('./testing');
const { createAtomicStructure } = require('../templates/atomicStructure');
const { updatePackageJson } = require('../templates/packageJson');
const { askUserWhereToOpen } = require('../utils/logging');
const inquirer = require('inquirer');

async function initProject(projectDirectory, userInput, options) {
  const root = path.resolve(projectDirectory);
  const verboseFlag = options.verbose ? '--verbose' : '';

  // Create the project directory
  fs.mkdirSync(root, { recursive: true });
  process.chdir(root);

  console.log(`🚀 Creating a new React app in ${root}...`);

  const spinner = ora('Installing base Create React App...').start();

  try {
    // Initialize CRA with or without TypeScript
    const template = userInput.language === 'TypeScript' ? '--template typescript' : '';
    execSync(`npx create-react-app . ${template} ${verboseFlag}`, { stdio: 'inherit' });
    spinner.succeed('✅ Base React app created successfully.');
  } catch (error) {
    spinner.fail('❌ Failed to create base React app.');
    console.error(error);
    process.exit(1);
  }

  // Set up Git
  setupGit(options);
  // Install additional dependencies
  installDependencies(userInput, options);
  // Install additional dev dependencies
  installDevDependencies(options);

  // Set up additional features based on user input
  if (userInput.useHusky) setupHusky(options);
  if (userInput.useRedux) setupRedux(options);
  setupStyles(userInput.styling);
  setupTesting(userInput.testingFramework);

  // Create atomic design structure
  createAtomicStructure();

  // Update package.json
  updatePackageJson(userInput);

  console.log('🎉 Project setup complete!');

  // Ask user where to open the project
  askUserWhereToOpen(root);
}

module.exports = { initProject };
