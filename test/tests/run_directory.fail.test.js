import assert from 'assert/strict'
import { runDirectory } from "../../lib/runners.js"
import { testAsset } from '../utils.js'

try {
	await runDirectory(testAsset('single/fail'))
	assert.fail()
} catch (error) {
	assert.equal(error.code, 'ERR_ASSERTION')
	assert.equal(error.operator, 'fail')
}
