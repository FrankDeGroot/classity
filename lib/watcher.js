import chokidar from 'chokidar'
import { runDirectory } from './runners.js'

export async function watchDirectory(path) {
	await runDirectoryIgnoreError(path)
	const watcher = chokidar.watch(path, {
		ignored: /node_modules/
	}).on('ready', () => {
		watcher.on('all', async () => {
			await runDirectoryIgnoreError(path)
		})
	})
}

async function runDirectoryIgnoreError(path) {
	try {
		await runDirectory(path)
	} catch (error) {
		console.log(error)
	}
}
