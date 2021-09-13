import { readdir } from 'fs/promises'
import { join } from 'path'

try {
	console.log(process.cwd())
	const testPath = join(process.cwd(), 'test', 'tests')
	const files = await readdir(testPath)
	await files.reduce(async (previous, file) => {
		await previous
		const path = join(testPath, file)
		console.log('Running', path)
		await import(path)
	}, Promise.resolve())
	console.log('Tests succeeded')
	process.exitCode = 0
} catch (exception) {
	console.error(exception)
	process.exitCode = 1
}
