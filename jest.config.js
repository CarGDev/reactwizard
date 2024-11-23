module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/bin'],
  testEnvironment: 'node',
  roots: ['<rootDir>/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
