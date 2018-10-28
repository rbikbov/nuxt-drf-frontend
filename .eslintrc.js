module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: ['airbnb-base', 'prettier'],
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // do not allow console.logs etc...
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // for root alias
    'import/no-unresolved': [
      'error',
      {
        ignore: ['~/']
      }
    ],
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/no-extraneous-dependencies': 0,
    'linebreak-style': 0
  },
  globals: {}
};
