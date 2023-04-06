import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { foo } from '../../main/ts'

test('index has proper index', () => {
  assert.ok(typeof foo === 'string')
})

test.run()
