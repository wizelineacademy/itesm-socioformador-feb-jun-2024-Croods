import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import config from "./prettier.config.mjs"

export default [
  { languageOptions: { globals: globals.browser } },
  ...config,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
]
