import assert from 'assert/strict'
import { runClass } from '../../lib/runners.js'

const calls = []

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
	}
	test2() {
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
