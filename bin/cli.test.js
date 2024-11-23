const { execSync } = require('child_process');

describe('React Crafter CLI', () => {
  test('CLI runs and shows version', () => {
    const output = execSync('node bin/cli.js --version').toString();
    expect(output.trim()).toMatch(/\\d+\\.\\d+\\.\\d+/); // Matches a version format
  });

  test('CLI handles missing arguments', () => {
    const output = execSync('node bin/cli.js').toString();
    expect(output).toContain('React Crafter CLI');
  });
});
