import assert from 'assert/strict'
import { runClass } from '../../lib/runners.js'

const calls = []

await runClass(class TestOrder {
	async test1() {
		await 1
		calls.push('test1')
	}
	async test2() {
		await 1
		calls.push('test2')
	}
})

assert.deepEqual(calls, [
	'test1',
	'test2',
])
