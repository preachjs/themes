# @preachjs/themes

> Simple, lightweight theme management for Preact applications

[![NPM](https://img.shields.io/npm/v/@preachjs/themes.svg)](https://www.npmjs.com/package/@preachjs/themes)

[Demo &rarr;](https://preachjs.github.io/themes/)

## Highlights

- 📦 Tiny bundle size (~413B GZipped)
- 🤌 Simple API
- No FOUC (in cases where preact isn't loaded on network)
- Based on [@dumbjs/persona](https://github.com/dumbjs/persona)

## Install

```sh
# npm
npm install @preachjs/themes

# yarn
yarn add @preachjs/themes

# pnpm
pnpm add @preachjs/themes
```

## Usage

```jsx
import { ThemeProvider, useTheme } from '@preachjs/themes'

const Main = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

const App = () => {
  const { theme, setTheme } = useTheme('system')

  return (
    <>
      <p>Current Theme: {theme}</p>
      <button
        onClick={() => {
          setTheme('light')
        }}
      >
        Light
      </button>
      <button
        onClick={() => {
          setTheme('dark')
        }}
      >
        Dark
      </button>
      <button
        onClick={() => {
          setTheme('system')
        }}
      >
        System
      </button>
    </>
  )
}
```

## Configuration

The `ThemeProvider` component accepts the following props:

- `defaultTheme`: The initial theme to use (`'light'`, `'dark'`, or `'system'`).
  Defaults to `'system'`.
- `storageKey`: The key used to persist theme preference in localStorage.
  Defaults to `'theme'`.

```jsx
<ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
  <App />
</ThemeProvider>
```

## Theme Options

Three theme options are available:

- `light`: Forces light theme
- `dark`: Forces dark theme
- `system`: Automatically switches between light and dark based on system
  preferences

## API Reference

### useTheme(defaultTheme?: string)

React hook that provides theme management functionality.

Returns:

- `theme`: Current theme value (`'light'`, `'dark'`, or `'system'`)
- `setTheme`: Function to update the theme

Example:

```jsx
const { theme, setTheme } = useTheme('system')
```

### ThemeProvider

Context provider component that must wrap your application.

Props:

- `defaultTheme`: Initial theme (optional)
- `storageKey`: localStorage key for persistence (optional)
- `children`: React nodes

Example:

```jsx
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>
```

### Advanced Usage

For Advanced use cases like multiple themes and different default states, you
can write your own context and use
[@dumbjs/persona](https://github.com/dumbjs/persona) that abstracts the browser
APIs to make it simpler for you to use.
