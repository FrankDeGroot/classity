import assert from 'assert/strict'
import { testAsset } from '../utils.js'
import { getClasses } from '../../lib/enumerators.js'

assert.deepEqual((await getClasses(testAsset('single/ok/single.ok.test.js'))).map(c => c.name), ['SingleOk'])
assert.deepEqual((await getClasses(testAsset('multiple/ok/multiple.ok.test.js'))).map(c => c.name), ['Class1', 'Class2', 'b', 'default'])
