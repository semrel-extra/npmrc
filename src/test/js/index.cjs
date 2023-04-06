const { test } = require('uvu')
const assert = require('node:assert')
const npmrc = require('@semrel-extra/npmrc')

test('index (cjs)', () => {
  assert.ok(typeof npmrc.formatNpmrc === 'function')
})

test.run()
