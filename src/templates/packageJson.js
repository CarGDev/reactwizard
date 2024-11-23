// Placeholder for packageJson.js
function updatePackageJson() {
  const spinner = ora(
    '📝 Updating package.json with custom scripts...'
  ).start();

  const packageJsonPath = path.resolve('package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.scripts = {
    start: 'webpack serve --config webpack.config.js --mode development',
    build: 'webpack --config webpack.config.js --mode production',
    test: 'echo "Error: no test specified" && exit 0',
    'test:dev': 'react-scripts test',
    'pretty-quick': 'pretty-quick',
    'lint:prettier': 'node check-format.js',
    prettier: 'prettier --write . --config .prettierrc',
    'prettier:commit': 'node prettier-commit.js',
    eject: 'react-scripts eject',
    prepare: 'husky install',
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  spinner.succeed('📝 package.json updated with custom scripts.');
}

module.exports = { updatePackageJson };
