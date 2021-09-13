import { copyFile, mkdir, mkdtemp, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { replaceEsm as replace, reset, verify, when } from 'testdouble'

import { testAsset } from '../utils.js'

const { runDirectory } = await replace('../../lib/runners.js')
const { watchDirectory } = await import('../../lib/watcher.js')

// There should be an initial run.
await inDirectory(undefined, async path => {
	verify(runDirectory(path))
})

// Should continue on failing runs.
await inDirectory(async path => {
	when(runDirectory).thenReject(new Error())
}, async path => {
	await wait()
	await addFile(path, 'code.js')
	verify(runDirectory(path), { times: 2 })
})

// Adding a JavaScript file should trigger a run.
await inDirectory(undefined, async path => {
	await skipInitialRun()
	await addFile(path, 'code.js')
	verify(runDirectory(path))
})

// Adding a CJS file should trigger a run.
await inDirectory(undefined, async path => {
	await skipInitialRun()
	await addFile(path, 'code.test.cjs')
	verify(runDirectory(path))
})

// Adding a ESM file should trigger a run.
await inDirectory(undefined, async path => {
	await skipInitialRun()
	await addFile(path, 'code.test.mjs')
	verify(runDirectory(path))
})

// Adding a ESM file in a subdirectory should trigger a run.
await inDirectory(undefined, async path => {
	await skipInitialRun()
	const subdirectory = join(path, 'subdir')
	await mkdir(subdirectory)
	await addFile(subdirectory, 'code.test.mjs')
	await addFile(path, 'code.test.mjs')
	verify(runDirectory(path))
})

// Adding a non-JavaScript file should NOT trigger a run.
await inDirectory(undefined, async path => {
	await skipInitialRun()
	await addFile(path, 'readme.md')
	verify(runDirectory(path), { times: 0 })
})

async function skipInitialRun() {
	reset()
	await wait()
}

async function addFile(path, name) {
	await copyFile(watcherAsset('somefile'), join(path, name))
	await wait()
}

function watcherAsset(path) {
	return testAsset(join('watcher', path))
}

function wait() {
	return new Promise(resolve => {
		setTimeout(() => resolve(), 10)
	})
}

async function inDirectory(arrange, assert) {
	const path = await mkdtemp(join(tmpdir(), 'watcher-'))
	try {
		if (arrange) await arrange(path)
		const closer = await watchDirectory(path)
		try {
			await assert(path)
		} finally {
			await closer()
		}
	} finally {
		try {
			await rm(path, { recursive: true, force: true })
		} catch (error) {
			if (error.code !== 'ENOENT') {
				throw error
			}
		}
	}
}
