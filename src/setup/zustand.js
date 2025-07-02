const ora = require('ora');
const fs = require('fs');
const path = require('path');

function setupZustand(options) {
  const spinner = ora('🛠️ Setting up Zustand...').start();

  // Create store folder
  fs.mkdirSync('src/store', { recursive: true });

  const extension = options.language === 'TypeScript' ? '.ts' : '.js';
  const storeIndex = `import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
`;

  fs.writeFileSync(path.resolve(`src/store/index${extension}`), storeIndex);

  spinner.succeed('🛠️ Zustand set up.');
}

module.exports = { setupZustand };
