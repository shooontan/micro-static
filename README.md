# micro-static

[![npm version](https://img.shields.io/npm/v/micro-static.svg)](https://www.npmjs.com/package/micro-static)
[![install size](https://packagephobia.now.sh/badge?p=micro-static)](https://packagephobia.now.sh/result?p=micro-static)
[![Actions Status](https://github.com/shooontan/micro-static/workflows/ci/badge.svg)](https://github.com/shooontan/micro-static/actions)

Static file with [micro](https://github.com/zeit/micro).

## Install

```bash
# npm
$ npm install micro-static

# or yarn
$ yarn add micro-static
```

## Usage

```js
// index.js
const { microStatic } = require('micro-static');

module.exports = microStatic('public');
```

```bash
$ micro index.js
```

## Development

```bash
# ts build
$ npm run build

# test
$ npm t
```