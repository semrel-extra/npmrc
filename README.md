# dotnpmrc
> `.npmrc` formatter
 
## Usage
```ts
import {formatNpmrc} from 'dotnpmrc'

const contents = formatNpmrc({
  format: 'npm9',
  scopes: [{
    name: 'example',
    registry: 'https://npm-registry.example.com/',
    auth: 'base64-of-username-and-password',
    authToken: 'npmToken.bearer',
    alwaysAuth: true,
  }],
  root: {
    registry: 'https://registry.yarnpkg.com'
  }
})

await fs.writeFile('.npmrc', contents, {encoding: 'utf8'})
```

## License
[MIT](./LICENSE)
