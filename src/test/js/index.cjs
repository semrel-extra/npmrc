const { test } = require('uvu')
const assert = require('node:assert')
const toposource = require('@semrel-extra/npmrc')

test('index (cjs)', () => {
  assert.ok(typeof toposource.foo === 'string')
})

test.run()
