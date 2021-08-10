import assert from 'assert/strict'
import { testAsset } from '../utils.js'
import { getFiles } from '../../lib/enumerators.js'

assert.deepEqual(await getFiles(testAsset('a')), [
	'a/a.test.js',
	'a/b/b.test.js',
	'a/b/b.test.mjs',
	'a/b/c/c.test.js',
	'a/b/c/c.test.mjs'
].map(testAsset))
