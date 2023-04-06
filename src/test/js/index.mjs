import { test } from 'uvu'
import assert from 'node:assert'
import {foo} from '@semrel-extra/npmrc'

test('index (mjs)', () => {
  assert.ok(typeof foo === 'string')
})

test.run()
