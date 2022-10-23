module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
  },
  rules: {
    semi: 1,
    'comma-dangle': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/semi': ['always'],
  },
};
