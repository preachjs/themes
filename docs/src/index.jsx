import { render } from 'preact'
import { THEMES, ThemeProvider, useTheme } from '../../dist/themes.js'
import './index.css'

const Main = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

const THEME_OPTIONS = [
  {
    label: 'System',
    id: THEMES.SYSTEM,
  },
  {
    label: 'Light',
    id: THEMES.LIGHT,
  },
  {
    label: 'Dark',
    id: THEMES.DARK,
  },
]

const App = () => {
  const { theme, setTheme } = useTheme(THEMES.SYSTEM)

  return (
    <div class="w-full min-h-[80vh] flex flex-col h-full justify-center items-center">
      <p class="my-10">Current Theme: {theme}</p>
      <div class="flex gap-2">
        {THEME_OPTIONS.map(d => {
          return (
            <button class="btn" onClick={() => setTheme(d.id)}>
              {d.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

render(<Main />, document.getElementById('app'))
