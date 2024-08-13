// tests/index.test.js

const { installDependencies } = require('../index');
const child_process = require('child_process');

jest.mock('child_process');

describe('installDependencies', () => {
  it('should install dependencies without errors', () => {
    const execSyncMock = jest.spyOn(child_process, 'execSync').mockImplementation(() => {});
    
    installDependencies();
    
    expect(execSyncMock).toHaveBeenCalledWith(expect.stringContaining('npm install'), expect.anything());
    
    execSyncMock.mockRestore();
  });
});
