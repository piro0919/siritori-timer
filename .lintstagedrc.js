module.exports = {
  "*": "prettier --ignore-unknown --write",
  "**/*.scss": "stylelint --fix",
  "**/*.ts?(x)": "eslint --fix",
};
