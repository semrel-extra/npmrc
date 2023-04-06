import { test } from 'uvu'
import * as assert from 'uvu/assert'

import {formatNpmrc, INpmrcData} from '../../main/ts'

test('index has proper index', () => {
  assert.ok(typeof formatNpmrc === 'function')
})

test('`formatNpmrc()` returns proper contents', () => {
  const cases: [INpmrcData, string][] = [
    [
      {},
      ''
    ],
    [
      {
        scopes: {
          test: {
            registry: 'https://registry.example.com',
            'always-auth': '',
            auth: 'basic',
            _authToken: 'bearer'
          }
        }
      },
`@test:registry=https://registry.example.com
//registry.example.com/:always-auth=true
//registry.example.com/:_auth=basic
//registry.example.com/:_authToken=bearer
`
    ],
    [
      {
        format: 'npm9',
        root: {
          'always-auth': '',
          'auth': 'basic'
        }
      },
`always-auth=true
//registry.npmjs.org/:_auth=basic
`
    ],
    [
      {
        root: {
          'always-auth': '',
          'auth': 'basic'
        }
      },
`always-auth=true
_auth=basic
`
    ]
  ];

  for (const [data, expected] of cases) {
    assert.equal(formatNpmrc(data), expected)
  }
})

test.run()
