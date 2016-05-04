/* eslint-env mocha */

import expect from 'must'

// ===================================================================

import through2 from 'through2'
import readAllStream from 'read-all-stream'
import { defer } from 'promise-toolbox'

import partialStream from './'

// ===================================================================

describe('partialStream', () => {
  it('split on string', () => {
    const { promise: head, resolve } = defer()

    const input = through2()
    input.write('foo\n')
    input.write('bar\n\n')
    input.write('baz')
    input.end()

    const stream = input.pipe(partialStream('\n\n', resolve))

    return Promise.all([
      head.then(value => expect(value).to.equal('foo\nbar')),
      readAllStream(stream).then(value => expect(value).to.equal('baz'))
    ])
  })

  it('split on regexp', () => {
    const { promise: head, resolve } = defer()

    const input = through2()
    input.write('foo\n')
    input.write('bar\n\n')
    input.write('baz')
    input.end()

    const stream = input.pipe(partialStream(/\n{2}/, resolve))

    return Promise.all([
      head.then(value => expect(value).to.equal('foo\nbar')),
      readAllStream(stream).then(value => expect(value).to.equal('baz'))
    ])
  })
})
