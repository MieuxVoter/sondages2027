import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  Outlet,
} from '@tanstack/react-router'
import { App } from './components/App'
import { Majoritaire } from './components/Majoritaire'
import { Building } from './components/Building'
import { TestPlotly } from './components/chart/plotly/TestPlotly'
import { JmRankingChart } from './components/chart/echart/JmRankingChart'
import { JmMeritChart } from './components/chart/echart/JmMeritChart'
import { JmTimeMeritChart } from './components/chart/echart/JmTimeMerit'
import { Box } from '@mui/material'

const rootRoute = createRootRoute({
  component: App,
})

const rootIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: '/majoritaire' })
  },
})

const majoritaireRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/majoritaire',
  component: Outlet,
})

const majoritaireIndexRoute = createRoute({
  getParentRoute: () => majoritaireRoute,
  path: '/',
  component: Majoritaire,
})

const evolutionClassementRoute = createRoute({
  getParentRoute: () => majoritaireRoute,
  path: '/evolution-classement',
  component: () => (
    <Box sx={{ width: '100%', height: '600px', p: 4 }}>
      <JmRankingChart />
    </Box>
  ),
})

const profileMeriteSondageRoute = createRoute({
  getParentRoute: () => majoritaireRoute,
  path: '/profile-merite-sondage',
  component: () => (
    <Box sx={{ width: '100%', height: '600px', p: 4 }}>
      <JmMeritChart />
    </Box>
  ),
})

const grilleProfileMeriteRoute = createRoute({
  getParentRoute: () => majoritaireRoute,
  path: '/grille-profile-merite',
  component: () => (
    <Box sx={{ width: '100%', height: '600px', p: 4 }}>
      <JmTimeMeritChart />
    </Box>
  ),
})

const uninominalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/uninominal',
  component: Building
})

const approbationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/approbation',
  component: Building,
})

const testPlotly = createRoute({
  getParentRoute: () => rootRoute,
  path: '/test-plotly',
  component: TestPlotly,
})

const routeTree = rootRoute.addChildren([
  rootIndexRoute,
  majoritaireRoute.addChildren([
    majoritaireIndexRoute,
    evolutionClassementRoute,
    profileMeriteSondageRoute,
    grilleProfileMeriteRoute,
  ]),
  uninominalRoute,
  approbationRoute,
  testPlotly,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

