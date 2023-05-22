module.exports = {
  '*.{json,css,scss,md,html}': ['prettier --write'],
  '*.{js,ts}': ['tslint --fix', 'prettier --write'],
};
