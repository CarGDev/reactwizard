const fs = require('fs');
const ora = require('ora');

function createAtomicStructure() {
  const spinner = ora('🏗️ Creating atomic design structure…').start();
  const atomicStructure = [
    'src/components/atoms',
    'src/components/molecules',
    'src/components/organisms',
    'src/components/templates',
    'src/components/pages',
  ];

  atomicStructure.forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
  });
  spinner.succeed('🏗️ Atomic design structure created.');
}

module.exports = { createAtomicStructure };
