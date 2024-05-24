// .lintstagedrc.mjs
import path from "path"

/**
 * Generates command to run 'next lint' properly
 * @param {*} filenames
 * @returns command
 */
const nextEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`

export default {
  "*.{js,ts,tsx}": [nextEslintCommand],
  "*.{json,css}": "prettier -w",
}
