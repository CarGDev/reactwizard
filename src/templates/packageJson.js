const fs = require('fs');
const ora = require('ora');
const path = require('path');

function updatePackageJson() {
  const spinner = ora(
    '📝 Updating package.json with custom scripts...'
  ).start();

  const packageJsonPath = path.resolve('package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.scripts = {
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview',
    test: 'echo "Error: no test specified" && exit 0',
    'pretty-quick': 'pretty-quick',
    'lint:prettier': 'node check-format.js',
    prettier: 'prettier --write . --config .prettierrc',
    'prettier:commit': 'node prettier-commit.js',
    prepare: 'husky install',
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  spinner.succeed('📝 package.json updated with custom scripts.');
}

module.exports = { updatePackageJson };
