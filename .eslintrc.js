module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    "google",
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    "comma-dangle": [
      "error",
      "always"
    ],
    "array-bracket-spacing": [
      "error",
      "always"
    ],
    "semi": [
      "error",
      "never"
    ],
    "indent": [
      "error",
      2
    ],
    "indent-legacy": [
      "error",
      2
    ],
    "arrow-parens": [
      "error",
      "always"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "max-len": [
      "error",
      {
        "code": 5000
      }
    ],
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "sort-imports": 0,
    "global-require": 0,
    "no-trailing-spaces": 0,
    "spaced-comment": 0,
    "no-plusplus": 0,
    "no-undef": 0,
    "no-invalid-this": 0,
    "no-param-reassign": 0,
    "linebreak-style": 0,
    "vue/max-attributes-per-line": 0,
    "vue/html-self-closing": 0,
    "vue/require-prop-types": 0,
    "vue/singleline-html-element-content-newline": 0
  }
}
