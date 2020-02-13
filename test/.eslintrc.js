/**
 * ESLint overrides for spec files
 */

module.exports = {
  'env': {
    'mocha': true,
  },
  'globals': {
    'expect': true,
  },
  'rules': {
    // Allows us to make expect() calls without using return value.
    'no-unused-expressions': [ 'off' ],
    'max-lines': [ 'off' ],
  }
}
