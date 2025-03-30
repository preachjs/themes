import { h, render } from 'preact'
import { ThemeProvider, useTheme } from './bundle/themes.js'

const Main = () => {
  return h(ThemeProvider, {}, h(App, {}))
}

const App = () => {
  const { theme, setTheme } = useTheme('system')

  return h(
    'div',
    {
      class:
        'w-full min-h-[80vh] flex flex-col h-full justify-center items-center',
    },
    h(
      'p',
      {
        class: 'my-10',
      },
      `Current Theme: ${theme}`
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          gap: '5px',
        },
      },
      h(
        'button',
        {
          class: 'btn',
          onClick: () => {
            setTheme('light')
          },
        },
        'Light'
      ),
      h(
        'button',
        {
          class: 'btn',
          onClick: () => {
            setTheme('dark')
          },
        },
        'Dark'
      ),
      h(
        'button',
        {
          class: 'btn',
          onClick: () => {
            setTheme('system')
          },
        },
        'System'
      )
    )
  )
}

render(h(Main, {}), document.getElementById('app'))
