/**
 * Turn a string representation of a route into a RegExp, capturing
 * all of the patterns described in that string.
 *
 * A placeholder like {name} matches any sequence of character up to
 * the nest "/" or the end of the URL. Trailing slashes must be
 * explicitly handled.
 */

function parser(string) {
  if (typeof string !== 'string') {
    throw new TypeError('path must be a string')
  }
}

module.exports = parser
