const parser = require('../src/index.js')

describe('path-param-matcher', () => {
  it('throws TypeError for non-string arguments', () => {
    const number = () => parser(1)
    const array = () => parser([])
    const object = () => parser({})
    const nil = () => parser(null)
    const nada = () => parser(undefined)
    const error = () => parser(new Error())

    const expected = 'path must be a string'

    expect(number, 'number').to.throw(TypeError, expected)
    expect(array, 'array').to.throw(TypeError, expected)
    expect(object, 'object').to.throw(TypeError, expected)
    expect(nil, 'null').to.throw(TypeError, expected)
    expect(nada, 'undefined').to.throw(TypeError, expected)
    expect(error, 'Error').to.throw(TypeError, expected)
  })

  it('throws TypeError for paths without forward slash prefix', () => {
    const empty = () => parser('')
    const random = () => parser('abc')
    const backslash = () => parser('\\')

    const expected = 'path must begin with forward slash'

    expect(empty, '""').to.throw(TypeError, expected)
    expect(random, 'abc').to.throw(TypeError, expected)
    expect(backslash, '\\').to.throw(TypeError, expected)
  })

  it('throws TypeError for paths with illegal placeholder regex', () => {
    const containsSlash = () => parser('/date/2020/{mm:\\d\\d/\\d}/07')
    const extraLeftBrace = () => parser('/date/2020/{mm:\\d{\\d\\d}/07')
    const extraRightBrace = () => parser('/date/2020/{mm:}\\d\\d\\d}/07')

    const expected = 'path placeholder contains illegal regex'

    expect(containsSlash, 'contains slash').to.throw(TypeError, expected)
    expect(extraLeftBrace, 'extra left brace').to.throw(TypeError, expected)
    expect(extraRightBrace, 'extra right brace').to.throw(TypeError, expected)
  })

  it('matches "/"', () => {
    const path = '/'
    const expected = new RegExp(/^\/$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.true
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/aa'), '/aa').to.be.false
  })

  it('matches "/some/thing"', () => {
    const path = '/some/thing'
    const expected = new RegExp(/^\/some\/thing$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.false
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/some'), '/some').to.be.false
    expect(result.test('/some/'), '/some/').to.be.false
    expect(result.test('/some/thing'), '/some/thing').to.be.true
    expect(result.test('/some/thing/'), '/some/thing/').to.be.false
  })

  it('matches "/some/thing/"', () => {
    const path = '/some/thing/'
    const expected = new RegExp(/^\/some\/thing\/$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.false
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/some'), '/some').to.be.false
    expect(result.test('/some/'), '/some/').to.be.false
    expect(result.test('/some/thing'), '/some/thing').to.be.false
    expect(result.test('/some/thing/'), '/some/thing/').to.be.true
  })

  it('matches "/{thing}"', () => {
    const path = '/{thing}'
    const expected = new RegExp(/^\/(?<thing>[^/]+)$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.false
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/aa'), '/aa').to.be.true
    expect(result.test('/aa/'), '/aa/').to.be.false
  })

  it('matches "/{thing}/"', () => {
    const path = '/{thing}/'
    const expected = new RegExp(/^\/(?<thing>[^/]+)\/$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.false
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/aa'), '/aa').to.be.false
    expect(result.test('/aa/'), '/aa/').to.be.true
  })

  it('matches "/{some}/{thing}"', () => {
    const path = '/{some}/{thing}'
    const expected = new RegExp(/^\/(?<some>[^/]+)\/(?<thing>[^/]+)$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.false
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/aa'), '/aa').to.be.false
    expect(result.test('/aa/'), '/aa/').to.be.false
    expect(result.test('/aa/bb'), '/aa/bb').to.be.true
    expect(result.test('/aa/bb/'), '/aa/bb/').to.be.false
  })

  it('matches "/{some}/{thing}/"', () => {
    const path = '/{some}/{thing}/'
    const expected = new RegExp(/^\/(?<some>[^/]+)\/(?<thing>[^/]+)\/$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.false
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/aa'), '/aa').to.be.false
    expect(result.test('/aa/'), '/aa/').to.be.false
    expect(result.test('/aa/bb'), '/aa/bb').to.be.false
    expect(result.test('/aa/bb/'), '/aa/bb/').to.be.true
  })

  it('matches "/date/{yyyy:\\d\\d\\d\\d}/{mm:\\d\\d}/{dd:\\d\\d}"', () => {
    const path = '/date/{yyyy:\\d\\d\\d\\d}/{mm:\\d\\d}/{dd:\\d\\d}'
    const expected = new RegExp(/^\/date\/(?<yyyy>\d\d\d\d)\/(?<mm>\d\d)\/(?<dd>\d\d)$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.false
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/aa'), '/aa').to.be.false
    expect(result.test('/aa/'), '/aa/').to.be.false
    expect(result.test('/aa/bb'), '/aa/bb').to.be.false
    expect(result.test('/aa/bb/'), '/aa/bb/').to.be.false
    expect(result.test('/date/2020/02/07'), '/date/2020/02/07').to.be.true
    expect(result.test('/date/0000/00/00'), '/date/0000/00/00').to.be.true
    expect(result.test('/date/0000/00/00/'), '/date/0000/00/00/').to.be.false
    expect(result.test('/date/yyyy/mm/dd/'), '/date/yyyy/mm/dd/').to.be.false
  })

  it('matches "/date/{yyyy:\\d\\d\\d\\d}/{mm:\\d\\d}/{dd:\\d\\d}/"', () => {
    const path = '/date/{yyyy:\\d\\d\\d\\d}/{mm:\\d\\d}/{dd:\\d\\d}/'
    const expected = new RegExp(/^\/date\/(?<yyyy>\d\d\d\d)\/(?<mm>\d\d)\/(?<dd>\d\d)\/$/)
    const result = parser(path)

    expect(result, 'RegExp').to.deep.eql(expected)
    expect(result.test('/'), '/').to.be.false
    expect(result.test(''), '').to.be.false
    expect(result.test('//'), '//').to.be.false
    expect(result.test('/aa'), '/aa').to.be.false
    expect(result.test('/aa/'), '/aa/').to.be.false
    expect(result.test('/aa/bb'), '/aa/bb').to.be.false
    expect(result.test('/aa/bb/'), '/aa/bb/').to.be.false
    expect(result.test('/date/2020/02/07'), '/date/2020/02/07').to.be.false
    expect(result.test('/date/0000/00/00'), '/date/0000/00/00').to.be.false
    expect(result.test('/date/0000/00/00/'), '/date/0000/00/00/').to.be.true
    expect(result.test('/date/0000/00/00/'), '/date/2020/02/07/').to.be.true
    expect(result.test('/date/yyyy/mm/dd/'), '/date/yyyy/mm/dd/').to.be.false
  })
})
