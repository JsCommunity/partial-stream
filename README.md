# partial-stream [![Build Status](https://travis-ci.org/julien-f/js-partial-stream.png?branch=master)](https://travis-ci.org/julien-f/js-partial-stream)

> Extract the first part of a stream based on a separator

## Install

Installation of the [npm package](https://npmjs.org/package/partial-stream):

```
> npm install --save partial-stream
```

## Usage

In this example, the header section of an HTTP response is extracted from the raw response.

```javascript
import partialStream from 'partial-stream'

const contentStream = rawHttpResponse
  .pipe(partialStream('\r\n\r\n', headers => {
    console.log(headers)
  })

contentStream.pipe(writeStream)
```

## Development

### Installing dependencies

```
> npm install
```

### Compilation

The sources files are watched and automatically recompiled on changes.

```
> npm run dev
```

### Tests

```
> npm run test-dev
```

## Contributions

Contributions are *very* welcomed, either on the documentation or on
the code.

You may:

- report any [issue](https://github.com/julien-f/js-partial-stream/issues)
  you've encountered;
- fork and create a pull request.

## License

${pkg.license} © [Julien Fontanet](https://github.com/julien-f)
