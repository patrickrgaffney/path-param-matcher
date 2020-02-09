/**
 * Turn a string representation of a route into a RegExp, capturing
 * all of the patterns described in that string.
 *
 * The path argument must be a string that begins with a forward slash.
 *
 * A placeholder like {name} matches any sequence of character up to
 * the nest "/" or the end of the URL. Trailing slashes must be
 * explicitly handled.
 */

function parser(path) {
  if (typeof path !== 'string') {
    throw new TypeError('path must be a string')
  } else if (path[0] !== '/') {
    throw new TypeError('path must begin with forward slash')
  }

  const segments = path.split('/')

  const pattern = segments.reduce((acc, seg) => {
    if (seg.length === 0) {
      return `${acc}/`
    } else if (seg[0] === '{' && seg[seg.length - 1] === '}') {
      // TODO: check for :[regex]
      const name = seg.substring(1, seg.length - 1)

      return `${acc}/(?<${name}>[^/]+)`
    }

    return acc
  })

  return new RegExp(`^${pattern}$`)
}

module.exports = parser
