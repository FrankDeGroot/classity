# Classity
Minimal Test Framework for NodeJS' modern ECMA Script capabilities:
* A Test File is named `name.test.(c|m)?js` in the current directory or a subdirectory, except `node_modules`.
* A Test Suite is an exported class, for example (assuming using modules):
```javascript
// Use node's built-in assertion library.
import assert from 'assert/strict'

// export default class {} is also valid.
export class MyTestSuite {
	static before() {
		// This is called once for each test suite.
		// Can be async.
	}
	constructor() {
		// This is called once for each test
		// because a new instance of this class is created for each test.
		// For sync code can be a replacement for the non-static before method below.
	}
	before() {
		// This is also called once for each test.
		// Can be async.
	}
	test1() {
		// A test
	}
	async test2() {
		// Another test, note that one or more methods can be async
		// except for the constructor.
	}
	after() {
		// This is called once after each test.
		// Can be async.
	}
	static after() {
		// This is called once after each test suite.
		// Can be async.
	}
}
```
# Usage
Install with `npm i --save-dev classity`.
Run once with `npx classity` or start a watcher with `npx classity watch`.
# Credits
I wanted a simple test framework like [teenytest](https://github.com/testdouble/teenytest) but wanted to use Classes and Promises by default.
