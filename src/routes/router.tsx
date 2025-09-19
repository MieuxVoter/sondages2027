import {
  Outlet,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent
} from '@mui/material'

const rootRoute = createRootRoute({
  component: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mon App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/info">
            Info
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
          <Outlet />
        </Container>
      </Box>

      <TanStackRouterDevtools />
    </Box>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome Home!
          </Typography>
          <Typography variant="body1">
            This is your MUI full-page application homepage.
          </Typography>
        </CardContent>
      </Card>
    )
  },
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About
          </Typography>
          <Typography variant="body1">
            Hello from the About page! This is built with Material-UI.
          </Typography>
        </CardContent>
      </Card>
    )
  },
})

const infoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info',
  component: function Info() {
    return (
      <Box>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Info Page
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/info/details"
              sx={{ mt: 1 }}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
        <Outlet />
      </Box>
    )
  },
})

const infoDetailsRoute = createRoute({
  getParentRoute: () => infoRoute,
  path: '/details',
  component: function InfoDetails() {
    return (
      <Card>
        <CardContent sx={{ bgcolor: 'grey.100' }}>
          <Typography variant="h5" gutterBottom>
            Details Section
          </Typography>
          <Typography variant="body1">
            This is the details section inside Info page!
          </Typography>
        </CardContent>
      </Card>
    )
  },
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  infoRoute.addChildren([infoDetailsRoute])
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

