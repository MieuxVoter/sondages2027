import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { router } from './router.tsx'
import { store } from './store/store'
import { themeColor } from './colors.ts'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: themeColor.primary,
    },
    secondary: {
      main: themeColor.secondary,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
