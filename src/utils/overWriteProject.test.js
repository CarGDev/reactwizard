const fs = require('fs');
const path = require('path');
const { overWrite } = require('./overWriteProject');

jest.mock('fs');
jest.mock('inquirer', () => ({
  prompt: jest.fn(() => Promise.resolve({ overwrite: true })),
}));

describe('overWrite Function', () => {
  const testDir = path.resolve('test-dir');

  beforeEach(() => {
    fs.existsSync.mockClear();
    fs.rmSync.mockClear();
  });

  test('Removes directory if overwrite is confirmed', async () => {
    fs.existsSync.mockReturnValue(true);
    const result = await overWrite(testDir);
    expect(fs.rmSync).toHaveBeenCalledWith(testDir, { recursive: true, force: true });
    expect(result).toBe(true);
  });

  test('Exits if overwrite is declined', async () => {
    require('inquirer').prompt.mockResolvedValueOnce({ overwrite: false });
    fs.existsSync.mockReturnValue(true);
    const result = await overWrite(testDir);
    expect(fs.rmSync).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });

  test('Proceeds if directory does not exist', async () => {
    fs.existsSync.mockReturnValue(false);
    const result = await overWrite(testDir);
    expect(fs.rmSync).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
