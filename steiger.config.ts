import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // Сегменты называем по назначению кода (types, constants, helpers, hooks),
      // а не только официальным набором ui/api/lib/model/config.
      'fsd/segments-by-purpose': 'off',
      // Сущность может жить своим слайсом, даже если пока используется в одном месте.
      'fsd/insignificant-slice': 'off',
    },
  },
])
