// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: ['vue'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    indent: 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'max-len': 0,
    'no-shadow': ['error', { allow: ['done'] }],
    'no-unused-vars': [1, { vars: 'local' }],
    'no-plusplus': 0,
    'no-trailing-spaces': 0,
    'prefer-template': 0,
    'no-lonely-if': 0,
    'padded-blocks': 0,
    'arrow-body-style': 0,
    'linebreak-style': 0,
    'prefer-destructuring': 0,
    'object-curly-newline': 0,
    'no-unused-expressions': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-underscore-dangle': 0,
    'no-mixed-operators': 0,
  },
};
