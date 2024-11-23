const fs = require('fs');
const path = require('path');
const { initProject } = require('./init');

jest.mock('fs');
jest.mock('ora', () => () => ({
  start: jest.fn(() => ({ succeed: jest.fn(), fail: jest.fn() })),
}));
jest.mock('./dependencies', () => ({ installDependencies: jest.fn() }));
jest.mock('../utils/prompts', () => ({ askUserWhereToOpen: jest.fn() }));

describe('initProject', () => {
  const testDir = 'test-project';

  beforeEach(() => {
    fs.mkdirSync.mockClear();
    fs.existsSync.mockReturnValue(false);
  });

  test('Creates project directory and initializes app', async () => {
    initProject(testDir, { useHusky: false }, { verbose: false });
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.resolve(testDir), { recursive: true });
  });

  test('Fails if directory already exists and not overwritten', () => {
    fs.existsSync.mockReturnValue(true);
    expect(() => initProject(testDir, {}, {})).toThrowError();
  });
});
