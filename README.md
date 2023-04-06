# dotnpmrc

[![CI](https://github.com/semrel-extra/npmrc/actions/workflows/ci.yaml/badge.svg)](https://github.com/semrel-extra/npmrc/actions/workflows/ci.yaml)
[![Maintainability](https://api.codeclimate.com/v1/badges/feba9cfac949309eeaad/maintainability)](https://codeclimate.com/github/semrel-extra/npmrc/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/feba9cfac949309eeaad/test_coverage)](https://codeclimate.com/github/semrel-extra/npmrc/test_coverage)

> `.npmrc` formatter

## Usage
```ts
import {formatNpmrc} from 'dotnpmrc'

const contents = formatNpmrc({
  format: 'npm9',
  scopes: {
    example: {
      registry: 'https://npm-registry.example.com/',
      auth: 'base64-of-username-and-password',
      authToken: 'npmToken.bearer',
      alwaysAuth: true,
    }
  },
  root: {
    registry: 'https://registry.yarnpkg.com'
  }
})

await fs.writeFile('.npmrc', contents, {encoding: 'utf8'})
```

## License
[MIT](./LICENSE)
