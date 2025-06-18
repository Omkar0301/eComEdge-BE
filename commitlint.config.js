// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // level: error
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // documentation only changes
        'style', // formatting, missing semi colons, etc
        'refactor', // code change that neither fixes a bug nor adds a feature
        'perf', // performance improvement
        'test', // adding or fixing tests
        'build', // changes that affect the build system or external dependencies
        'ci', // CI configuration
        'chore', // other changes that don't modify src or test files
        'revert' // revert to a commit
      ]
    ]
  }
};
