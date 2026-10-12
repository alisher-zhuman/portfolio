// The stored preference. 'system' defers to the OS and can resolve differently over time.
export type Theme = 'light' | 'dark' | 'system'

// What is actually applied to <html>: light is the «дневной матч», dark the «вечерний матч».
export type ResolvedTheme = 'light' | 'dark'
