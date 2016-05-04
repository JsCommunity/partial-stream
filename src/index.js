import through2 from 'through2'

// https://gist.githubusercontent.com/julien-f/0c86fce6906cad4315b3/raw/is.js
const [
  isFunction,
  isRegexp,
  isString
] = (() => {
  const {toString} = Object.prototype
  const _ = ref => {
    ref = toString.call(ref)
    return val => toString.call(val) === ref
  }

  return [
    _(_),
    _(/(?:)/),
    _('')
  ]
})()

function makeIndexer (matcher) {
  if (isFunction(matcher)) {
    return matcher
  }

  if (isString(matcher)) {
    const {length} = matcher
    return function (head) {
      const index = head.indexOf(matcher)

      return { index, length }
    }
  }

  if (isRegexp(matcher)) {
    return function (head) {
      const matches = matcher.exec(head)
      if (!matches) {
        return {}
      }

      return {
        index: matches.index,
        length: matches[0].length
      }
    }
  }

  throw new TypeError('invalid indexer/matcher')
}

const passThrough = (chunk, callback) => {
  callback(null, chunk)
}

export default function partialStream (matcher, cb) {
  let handler = (() => {
    let head = ''
    const indexer = makeIndexer(matcher)

    return (chunk, callback) => {
      chunk = String(chunk)

      head += chunk

      const { index, length } = indexer(head)
      if (index >= 0) {
        // Simply passes the next chunks through.
        handler = passThrough

        // Sends the head.
        cb(head.slice(0, index))

        // Passes the rest of the current chunk along.
        callback(null, head.slice(index + length))
      } else {
        callback()
      }
    }
  })()

  return through2((chunk, _, callback) => {
    // callback(null, chunk)
    handler(chunk, callback)
  })
}
