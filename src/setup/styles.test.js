const fs = require('fs');
const { setupStyles } = require('./styles');
const { execSync } = require('child_process');

jest.mock('fs');
jest.mock('child_process');

describe('setupStyles', () => {
  beforeEach(() => {
    fs.writeFileSync.mockClear();
    execSync.mockClear();
  });

  test('Sets up SCSS styles', () => {
    setupStyles('SCSS');
    expect(fs.writeFileSync).toHaveBeenCalledWith(expect.stringContaining('index.scss'), expect.any(String));
    expect(execSync).toHaveBeenCalledWith('npm install sass', { stdio: 'inherit' });
  });

  test('Fails for unsupported style options', () => {
    expect(() => setupStyles('UnknownStyle')).not.toThrow();
  });
});
