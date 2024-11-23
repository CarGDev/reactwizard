const fs = require('fs');
const path = require('path');
const ora = require('ora');
const { execSync } = require('child_process');

function setupStyles(userInput) {
  const { styleChoice, language } = userInput;
  const spinner = ora('🎨 Setting up styles...').start();

  try {
    const stylesMap = {
      CSS: { fileName: 'index.css', dependency: '' },
      SCSS: { fileName: 'index.scss', dependency: 'sass' },
      SASS: { fileName: 'index.sass', dependency: 'sass' },
      LESS: { fileName: 'index.less', dependency: 'less' },
    };

    // Ensure styleChoice is valid
    if (!stylesMap[styleChoice]) {
      spinner.fail(`❌ Unsupported style option: ${styleChoice}`);
      return;
    }

    const { fileName, dependency } = stylesMap[styleChoice];
    const stylePath = path.resolve('src', fileName);

    // Create the style file with a placeholder content
    fs.writeFileSync(stylePath, `/* Placeholder for ${styleChoice} styles */`);

    // Update index.js or index.tsx to include the style

    const indexPath = path.resolve('src', language === 'TypeScript' ? 'index.tsx' : 'index.js');
    let indexContent = fs.readFileSync(indexPath, 'utf8');

    // Remove any existing style imports and add the new one
    indexContent = indexContent.replace(/import\s+['"].*\.(css|scss|sass|less)['"];?/g, '');
    indexContent = `import './${fileName}';\n${indexContent}`;

    fs.writeFileSync(indexPath, indexContent);

    // Install necessary dependency for the chosen style
    if (dependency) {
      spinner.text = `📦 Installing ${dependency}...`;
      execSync(`npm install ${dependency}`, { stdio: 'inherit' });
    }

    spinner.succeed(`🎨 ${styleChoice} styles set up successfully.`);
  } catch (error) {
    spinner.fail('❌ Failed to set up styles.');
    console.error(error);
  }
}

module.exports = { setupStyles };
