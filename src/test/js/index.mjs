import { test } from 'uvu'
import assert from 'node:assert'
import { formatNpmrc } from '@semrel-extra/npmrc'

test('index (mjs)', () => {
  assert.ok(typeof formatNpmrc === 'function')
})

test.run()
