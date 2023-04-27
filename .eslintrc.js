module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    eqeqeq: "error",
    "no-console": 0,
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
  },
};
