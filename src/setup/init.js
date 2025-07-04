const path = require('path');
const { execSync } = require('child_process');
const ora = require('ora');
const fs = require('fs');
const { installDependencies } = require('./dependencies');
const { installDevDependencies } = require('./devDependencies');
const { setupHusky } = require('./husky');
const { setupRedux } = require('./redux');
const { setupZustand } = require('./zustand');
const { setupStyles } = require('./styles');
const { setupGit } = require('./gitInit');
const { setupTesting } = require('./testing');
const { setupModuleFederation } = require('./moduleFederation');
const { createAtomicStructure } = require('../templates/atomicStructure');
const { updatePackageJson } = require('../templates/packageJson');
const { askUserWhereToOpen } = require('../utils/logging');
const { printCommandSummary } = require('./printCommandSummary');
const inquirer = require('inquirer');


async function initProject(projectDirectory, userInput, options) {
  const root = path.resolve(projectDirectory);
  const verboseFlag = options.verbose ? '--verbose' : '';

  // Create the project directory
  fs.mkdirSync(root, { recursive: true });
  process.chdir(root);

  console.log(`🚀 Creating a new React app in ${root}...`);

  const templateMap = {
    JavaScript: 'react',
    TypeScript: 'react-ts',
  };
  const selectedTemplate = templateMap[userInput.language] || 'react';
  const spinner = ora(`⚙️ Setting up Vite + React + ${userInput.language}...`).start();

  try {
    // Initialize Vite with or without TypeScript, suppressing interactive prompts
    execSync(`npm create vite@latest . -- --template ${selectedTemplate} ${verboseFlag}`, {
      stdio: 'inherit',
    });
    spinner.succeed('✅ Base Vite app created successfully.');
  } catch (error) {
    spinner.fail('❌ Failed to create base Vite app.');
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
  if (userInput.stateLibrary === 'Redux Toolkit') {
    setupRedux(options);
  } else if (userInput.stateLibrary === 'Zustand') {
    setupZustand(options);
  }
  setupStyles(userInput.styling);
  setupTesting(userInput.testingFramework);
  if (userInput.useModuleFederation) {
    setupModuleFederation();
  }

  // Create atomic design structure
  createAtomicStructure();

  // Update package.json
  updatePackageJson(userInput);

  printCommandSummary();
  console.log('🎉 Project setup complete!');

  // Ask user where to open the project
  askUserWhereToOpen(root);
}

module.exports = { initProject };
