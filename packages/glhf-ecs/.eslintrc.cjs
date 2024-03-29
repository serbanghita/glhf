/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/stylistic'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', '@stylistic/ts'],
    root: true,
    rules: {
        "@typescript-eslint/no-inferrable-types": "off"
    }
};