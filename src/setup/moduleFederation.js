const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ora = require('ora');

function setupModuleFederation() {
  const spinner = ora('🔗 Setting up Module Federation...').start();
  try {
    execSync('npm install --save-dev @originjs/vite-plugin-federation', { stdio: 'inherit' });

    const configPath = path.resolve('vite.config.js');
    let config = fs.readFileSync(configPath, 'utf8');

    if (!config.includes('@originjs/vite-plugin-federation')) {
      const importLine = "import federation from '@originjs/vite-plugin-federation';\n";
      config = importLine + config;
      config = config.replace(/plugins:\s*\[(.*?)\]/s, (match, p1) => {
        const plugins = p1.trim();
        return `plugins: [${plugins ? plugins + ', ' : ''}federation({})]`;
      });
      fs.writeFileSync(configPath, config);
    }

    spinner.succeed('🔗 Module Federation configured.');
  } catch (error) {
    spinner.fail('❌ Failed to set up Module Federation.');
    console.error(error);
  }
}

module.exports = { setupModuleFederation };
