import { runDirectory } from "../../lib/runners.js"
import { testAsset } from '../utils.js'

await runDirectory(testAsset('single/ok'))
