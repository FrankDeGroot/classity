import assert from 'assert/strict'
import { runClass } from '../../lib/runners.js'

const calls = []

await assert.rejects(async () => {
	await runClass(class TestOrder {
		constructor() {
			calls.push('constructor')
		}
		static before() {
			calls.push('static before')
		}
		static after() {
			calls.push('static after')
		}
		before() {
			calls.push('before')
		}
		after() {
			calls.push('after')
		}
		test1() {
			calls.push('test1')
			assert.fail()
		}
		test2() {
			calls.push('test2')
		}
	})
}, error => {
	assert(error instanceof Error)
	assert.equal(error.code, 'ERR_ASSERTION')
	assert.equal(error.operator, 'fail')
	return true
})

assert.deepEqual(calls, [
	'static before',
	'constructor',
	'before',
	'test1',
	'after',
	'static after'
])
