/**
 * Regex to check for an illegal placeholder regular expression. A
 * placeholder regex is not allow to contain a forward slash "/".
 */

const illegalRegex = /\/\{[^}]*\/.*\}/

/**
 * Placeholder regexs cannot attempt to match '{' or '}'.
 */

const checkForExtraBrackets = (s = '') => {
  if (s.split('{').length - 1 > 1 || s.split('}').length - 1 > 1) {
    throw new TypeError('path placeholder contains illegal regex')
  }
}

/**
 * Placeholders allow for the following patterns:
 *
 *  - {name}: matches anything but slash, assigned to "name".
 *  - {name:\\w+}: matches "\w+", assigned to "name".
 *  - {:\\w+}: matches "\w+", anonymous pattern.
 */

function handlePlaceholders(seg, acc) {
  checkForExtraBrackets(seg)
  const placeholderRegex = seg.indexOf(':')

  if (placeholderRegex !== -1) {
    const name = seg.substring(1, placeholderRegex)
    const regex = seg.substring(placeholderRegex + 1, seg.length - 1)

    if (name.length === 0) {
      return `${acc}/(?:${regex})`
    }

    return `${acc}/(?<${name}>${regex})`
  }
  const name = seg.substring(1, seg.length - 1)

  return `${acc}/(?<${name}>[^/]+)`
}

/**
 * Turn a string representation of a route into a RegExp, capturing
 * all of the patterns described in that string.
 *
 * The path argument must be a string that begins with a forward slash.
 *
 * A placeholder like {name} matches any sequence of character up to
 * the nest "/" or the end of the URL. Trailing slashes must be
 * explicitly handled.
 *
 * Placeholders can include an optional regex override, after a colon:
 * e.g. "/date/{yyyy:\\d\\d\\d\\d}". Regular expressions including "{",
 * "}", or "/" are not supported and will throw a TypeError. Anonymous
 * patterns are allowed, and do no include a name: "{:\\w+}".
 */

function parser(path) {
  if (typeof path !== 'string') {
    throw new TypeError('path must be a string')
  } else if (path[0] !== '/') {
    throw new TypeError('path must begin with forward slash')
  } else if (path.search(illegalRegex) !== -1) {
    throw new TypeError('path placeholder contains illegal regex')
  }

  const segments = path.split('/')
  const pattern = segments.reduce((acc, seg) => {
    if (seg.length === 0) {
      return `${acc}/`
    } else if (seg[0] === '{' && seg[seg.length - 1] === '}') {
      return handlePlaceholders(seg, acc)
    }

    return `${acc}/${seg}`
  })

  return new RegExp(`^${pattern}$`)
}

module.exports = parser
