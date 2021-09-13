import { readdir, stat } from 'fs/promises'
import { dirname, join } from 'path'

export const pathExclude = /node_modules/
export const codeFileGlob = "/**/*.?([cm])js"
export const testFileRegex = /.*\.test\.[cm]?js/

export async function getFiles(path) {
	return (await Promise.all((await readdir(path))
		.filter(name => !name.match(pathExclude))
		.map(name => join(path, name))
		.map(async path =>
			(await stat(path)).isDirectory() ? getFiles(path) : path
		)))
		.flatMap(paths => paths)
		.filter(path => path.match(testFileRegex))
}

export async function getClasses(path) {
	process.chdir(dirname(path))
	const module = await import(path)
	return Object.getOwnPropertyNames(module)
		.map(name => module[name])
		.filter(testClass => testClass.name)
}
