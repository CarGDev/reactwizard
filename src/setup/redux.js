const ora = require('ora');
const fs = require('fs');
const path = require('path');

function setupRedux(options) {
  const spinner = ora('🛠️ Setting up Redux...').start();

  const reduxStructure = [
    'src/store',
    'src/store/slices',
    'src/store/middleware',
    'src/store/selectors',
  ];

  reduxStructure.forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
  });

  const appFileName = options.language === 'TypeScript' ? 'App.tsx' : 'App.js';
  const extension = options.language === 'TypeScript' ? '.ts' : '.js';
  const reactFileType = options.language === 'JavaScript' ? '' : ': React.FC';

  const storeIndex = `
import { configureStore } from ‘@reduxjs/toolkit’;

const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
  `;
  fs.writeFileSync(path.resolve(`src/store/index${extension}`), storeIndex);

  const appTsxJsPath = path.resolve(`src/${appFileName}`);
  let appTsxJs = fs.readFileSync(appTsxJsPath, 'utf8');
  appTsxJs = `
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App${reactFileType} = () => {
  return (
    <Provider store={store}>
      ${appTsxJs}
    </Provider>
  );
};

export default App;
  `;
  fs.writeFileSync(appTsxJsPath, appTsxJs);

  spinner.succeed('🛠️ Redux set up.');
}

module.exports = { setupRedux };
