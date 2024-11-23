#!/usr/bin/env node

const program = require('commander');
const { initProject } = require('../src/setup/init');
const { askProjectDetails } = require('../src/utils/prompts');
const { overWriteFolder } = require('../src/utils/overWriteFolder');

program
  .version('1.0.0')
  .description('React Crafter CLI')
  .arguments('<project-directory>')
  .option('--typescript', 'Use TypeScript template')
  .action(async (projectDirectory, options) => {
    // Use the overwrite function to manage the project directory
    const shouldProceed = await overWriteFolder(projectDirectory);
    console.log('shouldProceed', shouldProceed);
    if (!shouldProceed) {
      console.error('❌ Project initialization aborted.');
      process.exit(1);
    }

    // Proceed with project setup
    const userInput = await askProjectDetails();
    initProject(projectDirectory, userInput, options);
  })
  .parse(process.argv);

