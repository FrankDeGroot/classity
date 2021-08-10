import { getFiles, getClasses } from "./enumerators.js"

export async function runDirectory(path) {
	const paths = await getFiles(path)
	const classesPerFile = await Promise.all(paths.map(path => getClasses(path)))
	const classes = classesPerFile.flatMap(classes => classes)
	await classes.reduce(async (previousRun, testClass) => {
		await previousRun
		await runClass(testClass)
	}, Promise.resolve())
}

export async function runClass(testClass) {
	const { before, after } = getBeforeAfter(testClass)
	try {
		await before()
		await runClassTests(testClass)
	} finally {
		await after()
	}
}

async function runClassTests(testClass) {
	const classProto = testClass.prototype
	const instanceMethods = Object.getOwnPropertyNames(classProto)
	const { before, after } = getBeforeAfter(classProto)
	return await instanceMethods
		.filter(isATest)
		.reduce(async (previousTest, method) => {
			await previousTest
			const instance = new testClass
			try {
				await before.apply(instance)
				await classProto[method].apply(instance)
			} finally {
				await after.apply(instance)
			}
		}, Promise.resolve())
}

function getBeforeAfter(methods) {
	const ifHas = method => methods[method] || stub
	return {
		before: ifHas('before'),
		after: ifHas('after')
	}
}

function stub() {
}

function isATest(method) {
	return !['constructor', 'before', 'after'].includes(method)
}
