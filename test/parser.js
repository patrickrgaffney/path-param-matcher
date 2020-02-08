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

    expect(number).to.throw(TypeError, expected)
    expect(array).to.throw(TypeError, expected)
    expect(object).to.throw(TypeError, expected)
    expect(nil).to.throw(TypeError, expected)
    expect(nada).to.throw(TypeError, expected)
    expect(error).to.throw(TypeError, expected)
  })

  it('throws TypeError for paths without forward slash prefix', () => {
    const empty = () => parser('')
    const random = () => parser('abc')
    const backslash = () => parser('\\')

    const expected = 'path must begin with forward slash'

    expect(empty).to.throw(TypeError, expected)
    expect(random).to.throw(TypeError, expected)
    expect(backslash).to.throw(TypeError, expected)
  })
})
