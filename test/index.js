import { join } from 'path'
import { getFiles } from '../lib/enumerators.js'

try {
	const files = await getFiles(join(process.cwd(), 'test', 'tests'))
	await files.reduce(async (previous, file) => {
		await previous
		console.log('Running', file)
		await import(file)
	}, Promise.resolve())
	console.log('Tests succeeded')
	process.exitCode = 0
} catch (exception) {
	console.error(exception)
	process.exitCode = 1
}
