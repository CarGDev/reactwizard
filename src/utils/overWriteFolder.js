const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

async function overWriteFolder(root) {
  // Check if directory exists
  if (fs.existsSync(root)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `⚠️ The directory ${root} already exists. Do you want to overwrite it?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.error(`❌ Exiting setup as the directory ${root} already exists.`);
      process.exit(1);
    }

    console.log(`🗑️ Removing existing directory: ${root}`);
    fs.rmSync(root, { recursive: true, force: true });
  }
  return true;
}

module.exports = { overWriteFolder };
