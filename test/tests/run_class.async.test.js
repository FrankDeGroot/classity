import assert from 'assert/strict'
import { runClass } from '../../lib/runners.js'

const calls = []

await runClass(class TestOrder {
	constructor() {
		calls.push('constructor')
	}
	static async before() {
		await 1
		calls.push('static before')
	}
	static async after() {
		await 1
		calls.push('static after')
	}
	async before() {
		await 1
		calls.push('before')
	}
	async after() {
		await 1
		calls.push('after')
	}
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
	'static before',
	'constructor',
	'before',
	'test1',
	'after',
	'constructor',
	'before',
	'test2',
	'after',
	'static after',
])
