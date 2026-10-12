import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // Segment names follow what the code is (types, constants, helpers, hooks, stores)
      // rather than the official ui/api/lib/model/config set — same convention as kca.
      'fsd/segments-by-purpose': 'off',
      // A domain entity may be its own slice before it has a second consumer.
      'fsd/insignificant-slice': 'off',
    },
  },
])
