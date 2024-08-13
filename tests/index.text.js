// tests/index.test.js

const { printCommandSummary } = require('../index');
const chalk = require('chalk');

describe('printCommandSummary', () => {
  it('should print the command summary without errors', () => {
    // Mock console.log to capture output
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    printCommandSummary();
    
    // Check that console.log was called
    expect(logSpy).toHaveBeenCalled();
    
    // Restore console.log
    logSpy.mockRestore();
  });
});
