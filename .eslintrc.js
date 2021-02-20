module.exports = {
  "env": {
    "node": true,
		"es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": { "sourceType": "module" },
  "plugins": ["@typescript-eslint"],
  "globals": {
    "jest": true,
    "describe": true,
    "it": true,
    "expect": true,
    "beforeEach": true,
    "afterEach": true,
    "beforeAll": true,
    "afterAll": true
  },
  "rules": {
    "no-console": [0],
    "function-paren-newline": ["error", "consistent"],
    "import/no-extraneous-dependencies": [0],
    "@typescript-eslint/semi": 2,
		"@typescript-eslint/no-unused-vars": ["error", {
			"vars": "local",
			"args": "none"
		}],
		"@typescript-eslint/camelcase": 0,
		"@typescript-eslint/no-use-before-define": 1,
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/space-before-function-paren": ["error"]
  }
};
