const fs = require('fs');
const path = require('path');

// Helper function to create directories recursively
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Helper function to create files with default content
function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
  }
}

// Define the project structure
const projectStructure = {
  './bin': ['cli.js'],
  './src/setup': [
    'dependencies.js',
    'husky.js',
    'redux.js',
    'styles.js',
    'testing.js',
  ],
  './src/config': ['vite.config.js', 'babel.config.js'],
  './src/templates': [
    'atomicStructure.js',
    'packageJson.js',
    'reduxTemplate.js',
  ],
  './src/utils': ['fileUtils.js', 'logging.js', 'prompts.js'],
};

// Define root-level files with default content
const rootFiles = {
  'package.json':
    '{\n  "name": "project-name",\n  "version": "1.0.0",\n  "main": "bin/cli.js",\n  "scripts": {\n    "start": "node bin/cli.js"\n  }\n}',
  'README.md': '# Project Name\n\nThis is the README file for the project.',
  LICENSE: 'MIT License\n\nCopyright (c) 2024 Your Name',
};

// Create directories and files
for (const [dir, files] of Object.entries(projectStructure)) {
  createDirectory(dir);
  files.forEach((file) =>
    createFile(path.join(dir, file), `// Placeholder for ${file}`)
  );
}

// Create root-level files
for (const [file, content] of Object.entries(rootFiles)) {
  createFile(file, content);
}

console.log('Project structure setup complete.');
