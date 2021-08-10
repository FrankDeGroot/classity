import { dirname, join } from 'path'

export function testAsset(file) {
	return join(dirname(import.meta.url.substring(7)), 'assets', file)
}
