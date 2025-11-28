import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { router } from './router.tsx'
import { store } from './store/store'


const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: { fontFamily: '"DM Serif Display", serif' },
    h2: { fontFamily: '"DM Serif Display", serif' },
    h3: { fontFamily: '"DM Serif Display", serif' },
    h4: { fontFamily: '"DM Serif Display", serif' },
    h5: { fontFamily: '"DM Serif Display", serif' },
    h6: { fontFamily: '"DM Serif Display", serif' },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2400FD', // mv-brand
      light: '#654AFF',
      dark: '#0000C7',
    },
    secondary: {
      main: '#0A004C', // mv-brand-dark
    },
    background: {
      default: '#ffffff',
      paper: '#f8faff',
    },
    text: {
      primary: '#0A004C',
      secondary: '#8F88BA',
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // Pill shape
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(36, 0, 253, 0.2)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          color: '#fff',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(36, 0, 253, 0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#0A004C',
          boxShadow: '0 1px 0 rgba(36, 0, 253, 0.08)',
        },
      },
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
