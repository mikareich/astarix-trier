module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "simple-import-sort"],
  rules: {
    "react/prop-types": "off",
    "no-use-before-define": "off",
    "no-unused-vars": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    camelcase: "off",
    "simple-import-sort/imports": "error",
  },
  ignorePatterns: ["node_modules/"],
};
