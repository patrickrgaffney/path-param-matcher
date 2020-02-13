/**
 * Mocha configuration file
 *
 * An object must be exported from this file containing the
 * configuration. Anything in this file can be overridden by suppling
 * the corresponding CLI argument.
 */

module.exports = {
  // Allow uncaught errors to propagate and crash the process.
  'allow-uncaught': false,

  // Enforce that every test uses done() or returns a Promise.
  'async-only': false,

  // Bail after the first test failure.
  'bail': false,

  // Check for global variables that have leaked.
  'check-leaks': false,

  // User interface for test output.
  'ui': 'bdd',

  // Force color output to be enabled.
  'colors': true,

  // Show the diff between values when an assertion fails.
  'diff': true,

  // Enable "full" stack traces.
  'full-trace': false,

  // The reporter that will be used.
  'reporter': 'spec',

  // Files having these extensions will be considered test files.
  'extension': [ 'js' ],

  // Recurse into subdirectories looking for test files.
  'recursive': true,

  // Require a setup file before running any tests.
  'require': './test/setup',

  // Sort test files using Array.prototype.sort.
  'sort': true,
}
