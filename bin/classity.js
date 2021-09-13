#!/usr/bin/env node

import { runDirectory } from '../lib/runners.js'
import { watchDirectory } from '../lib/watcher.js'

const { log } = console

const cwd = process.cwd()
if (process.argv[2] === 'watch') {
	log('Watching...')
	await watchDirectory(cwd)
} else {
	log('Running tests...')
	await runDirectory(cwd)
}
