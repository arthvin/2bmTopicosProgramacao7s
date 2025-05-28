module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',               
  coverageDirectory: '../coverage',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', 
    },
  },
};
