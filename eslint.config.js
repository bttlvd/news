import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'no-unused-vars': 'warn',
      'vue/html-end-tags': 'error',
      'vue/multi-word-component-names': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/brace-style': 'off',
      'vue/no-watch-after-await': 'off',
    },
  },
)
