const chai = require('chai')

// Include stack traces in error messages.
chai.config.includeStack = true

// Show a diff when assertions fail.
chai.config.showDiff = true

// Disable truncating of actual and expected values.
chai.config.truncateThreshold = 0

global.expect = chai.expect
