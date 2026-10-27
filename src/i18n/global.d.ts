import type messages from '../../messages/ru.json'

import type { routing } from './routing'

// Types every t('…') key against the Russian file and every locale against the routing config, so a
// typo or a key missing from ru.json fails `pnpm typecheck`.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
