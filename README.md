# path-param-matcher

Parse URL route paths into a `RegExp` with a syntax similar to [`chi`](https://github.com/go-chi/chi). Conceptually similar to [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp), although simpler.

## Install

```sh
npm install --save path-param-matcher
```

## Usage

```js
const parser = require('path-param-matcher')

/** Basic routes. */
parser('/')
/** => new RegExp(/^\/$/)

/** Trailing slashes must be explicit. */
parser('/some/thing/')
/** => new RegExp(/^\/some\/thing\/$/)

/** Named placeholders. */
parser('/{some}/{thing}')
/** => new RegExp(/^\/(?<some>[^/]+)\/(?<thing>[^/]+)$/)

/** Placeholders can provide their own regex. */
parser('/date/{yyyy:\\d\\d\\d\\d}/{mm:\\d\\d}/{dd:\\d\\d}')
/** => new RegExp(/^\/date\/(?<yyyy>\d\d\d\d)\/(?<mm>\d\d)\/(?<dd>\d\d)$/) */

/** Anonymous placeholders. */
parser('/date/{:\\d\\d\\d\\d}/')
/** => new RegExp(/^\/date\/(?:\d\d\d\d)\/$/) */
```

## API

### `parser(path)`

- returns `RegExp`
- throws `TypeError`

#### `path`: `String`

A `TypeError` will be thrown if the `path` meets any of the following criteria:

- It is not a `String`.
- It does not begin with a `/`.
- A placeholder regex contains a `/`, `{`, or `}`.

## License

MIT © Pat Gaffney