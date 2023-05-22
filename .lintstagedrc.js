module.exports = {
  '*.{json,css,scss,md,html}': ['prettier --write'],
  '*.{js,ts}': ['eslint --fix', 'prettier --write'],
};
