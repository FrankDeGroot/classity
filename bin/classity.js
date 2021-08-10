#!/usr/bin/env node

import { runDirectory } from '../lib/runners.js'
import { watchDirectory } from '../lib/watcher.js'

const { log } = console

if (process.argv[2] === 'watch') {
	log('Watching...')
	await watchDirectory(process.cwd())
} else {
	log('Running tests...')
	await runDirectory(process.cwd())
}
