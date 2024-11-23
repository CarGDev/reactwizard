const chalk = require('chalk');

function printCommandSummary() {
  console.log(chalk.yellow('\n🔑 Project Setup Summary:'));
  console.log(chalk.cyan('\nAvailable Commands:'));

  console.log(chalk.green('1. 🚀 npm start'));
  console.log(
    chalk.white(
      '   Starts the development server with Webpack. The project is served using Webpack Dev Server with the configuration specified in webpack.config.js.'
    )
  );

  console.log(chalk.green('\n2. 🛠️ npm run build'));
  console.log(
    chalk.white(
      '   Builds the project for production. Webpack compiles the project and outputs the optimized bundle in the /dist directory.'
    )
  );

  console.log(chalk.green('\n3. 🧪 npm test'));
  console.log(
    chalk.white(
      '   Placeholder for running tests. Currently, it does not run any tests but can be customized to run Jest or other test suites.'
    )
  );

  console.log(chalk.green('\n4. 🧪 npm run test:dev'));
  console.log(
    chalk.white(
      '   Runs tests in watch mode using React Scripts. Suitable for a test-driven development approach.'
    )
  );

  console.log(chalk.green('\n5. 🎨 npm run pretty-quick'));
  console.log(
    chalk.white(
      '   Formats all staged files using Prettier. Ensures that code is consistently formatted before committing.'
    )
  );

  console.log(chalk.green('\n6. 🔍 npm run lint:prettier'));
  console.log(
    chalk.white(
      '   Checks the format of the entire codebase using a custom script. It can be used to ensure that all files adhere to Prettier’s formatting rules.'
    )
  );

  console.log(chalk.green('\n7. ✨ npm run prettier'));
  console.log(
    chalk.white(
      '   Formats the entire codebase using Prettier based on the configuration in .prettierrc.'
    )
  );

  console.log(chalk.green('\n8. ✨ npm run prettier:commit'));
  console.log(
    chalk.white(
      '   Applies Prettier formatting to staged files before committing. Ensures that committed code is properly formatted.'
    )
  );

  console.log(chalk.green('\n9. 🚨 npm run eject'));
  console.log(
    chalk.white(
      '   Ejects the project from Create React App. This command exposes the underlying configuration files for full control but cannot be undone.'
    )
  );

  console.log(chalk.green('\n10. 🛡️ npm run prepare'));
  console.log(
    chalk.white(
      '   Installs Husky hooks. This script is automatically run after dependencies are installed, setting up Git hooks for the project.'
    )
  );

  console.log(
    chalk.yellow(
      '\n🎉 Your project is ready! Use the above commands to start working on your new React app.'
    )
  );
}

module.exports = { printCommandSummary };
