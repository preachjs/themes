import {
  getSystemTheme,
  getThemeFromStorage,
  onSystemThemeChange,
  setTheme as setPersonaTheme,
} from '@dumbjs/persona'
import { Fragment, createContext, h } from 'preact'
import { useCallback, useContext, useEffect, useState } from 'preact/hooks'

export type ThemeCtx = { theme: string; setTheme: (t: string) => void }

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

const Context = createContext<ThemeCtx | undefined>(undefined)

export const useTheme = () =>
  useContext(Context) ?? {
    theme: 'system',
    setTheme() {},
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
        element: document.documentElement,
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
      <script
        dangerouslySetInnerHTML={{
          __html: `
          function getTheme(){
            const system = getSystemTheme()
            const storage = localStorage.getItem(\"${storageKey}\")
            if(storage){
              if(storage === "system"){
                return system
              }
              return storage
            }
            return system
          }

          function getSystemTheme() {
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          }

          const theme = getTheme()
          const el = document.documentElement
          el.dataset.theme = theme
          el.style.colorScheme = theme
          el.style.visibility = "hidden"
          
          function onMount(fn){
            document.addEventListener("DOMContentLoaded",fn)
            if(document.readyState==="interactive" || document.readyState==="complete"){
              fn()
            }
          }

          onMount(()=>{
            el.style.visibility = "visible"
          })
        `,
        }}
      ></script>
      <div key="kids">{children}</div>
    </Context.Provider>
  )
}
