import { strict as assert } from 'assert'

export class SingleFail {
	test() {
		assert.fail()
	}
}
