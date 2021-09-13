import { join } from 'path'
import chokidar from 'chokidar'
import { codeFileGlob, pathExclude } from './enumerators.js'
import { runDirectory } from './runners.js'

export async function watchDirectory(path) {
	await runDirectoryLogError(path)
	const watcher = chokidar.watch(join(path, codeFileGlob), {
		ignored: pathExclude
	}).on('ready', () => {
		watcher.on('all', async () => {
			await runDirectoryLogError(path)
		})
	})
	return () => watcher.close()
}

async function runDirectoryLogError(path) {
	try {
		await runDirectory(path)
	} catch (error) {
		console.log(error)
	}
}
