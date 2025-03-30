import {
  getSystemTheme,
  getThemeFromStorage,
  onSystemThemeChange,
  setTheme as setPersonaTheme,
} from '@dumbjs/persona'
import { createContext, h } from 'preact'
import { useCallback, useContext, useEffect, useState } from 'preact/hooks'

export type ThemeCtx = { theme: string; setTheme: (t: string) => void }

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

const _initContext: ThemeCtx = {
  theme: THEMES.SYSTEM,
  setTheme() {},
}

if (typeof window !== 'undefined') {
  _initContext.theme = getThemeFromStorage()
}

const Context = createContext<ThemeCtx>(_initContext)

export const useTheme = () => {
  return useContext(Context)
}

type Options = (typeof THEMES)[keyof typeof THEMES]

export const ThemeProvider = ({
  defaultTheme = THEMES.SYSTEM,
  children,
  storageKey = 'preach-themes',
}: {
  defaultTheme?: Options
  children: any
  storageKey?: string
}) => {
  const [theme, setTheme] = useState(defaultTheme)

  const setGlobalTheme = useCallback(
    (theme: string, store: boolean) =>
      setPersonaTheme(theme, {
        element: document.querySelector('html') as HTMLElement,
        storageKey: storageKey,
        store: store,
      }),
    [storageKey]
  )

  useEffect(() => {
    const storedTheme = getThemeFromStorage(storageKey) as Options
    changeTheme(storedTheme ?? defaultTheme)

    onSystemThemeChange(() => {
      const storedTheme = getThemeFromStorage(storageKey) as Options
      changeTheme(storedTheme)
    })
  }, [])

  const changeTheme = (theme: Options) => {
    if (theme === THEMES.SYSTEM) {
      const systemTheme = getSystemTheme()
      setGlobalTheme(THEMES.SYSTEM, true)
      setGlobalTheme(systemTheme, false)
      setTheme(THEMES.SYSTEM)
      return
    }
    setGlobalTheme(theme, true)
    setTheme(theme)
  }

  return (
    <Context.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </Context.Provider>
  )
}
