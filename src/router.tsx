import {
  createRootRoute,
  createRoute,
  createRouter,
  createHashHistory,
} from '@tanstack/react-router'
import { App } from './components/App'
import { Uninominal } from './components/Uninominal'
import { TestPlotly } from './components/chart/plotly/TestPlotly'
import { WebTimeMeritChart } from './components/web/chart-page/WebTimeMeritChart'
import { WebRankingChart } from './components/web/chart-page/WebRankingChart'
import { WebMeritChart } from './components/web/chart-page/WebMeritChart'
import { WebTimeMeritGrid } from './components/web/chart-page/WebTimeMeritGrid'
import { Landing } from './components/Landing'
import { Majoritaire } from './components/Majoritaire'
import { Approbation } from './components/Approbation'

const rootRoute = createRootRoute({
  component: App,
})

const rootIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
})

// Main routes use the new scrollable layouts
const majoritaireRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/majoritaire',
  component: Majoritaire,
})

const approbationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/approbation',
  component: Approbation,
})

const uninominalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/uninominal',
  component: Uninominal
})

// Detail pages (accessed via direct links if needed)
const evolutionClassementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/majoritaire/evolution-classement',
  component: WebRankingChart
})

const profileMeriteSondageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/majoritaire/profile-merite-sondage',
  component: WebMeritChart
})

const grilleProfileMeriteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/majoritaire/grille-profile-merite',
  component: WebTimeMeritGrid,
})

const ProfileMeriteCandidateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/majoritaire/profile-merite-candidate/$candidateId',
  component: WebTimeMeritChart,
})

const testPlotly = createRoute({
  getParentRoute: () => rootRoute,
  path: '/test-plotly',
  component: TestPlotly,
})

const routeTree = rootRoute.addChildren([
  rootIndexRoute,
  majoritaireRoute,
  approbationRoute,
  uninominalRoute,
  evolutionClassementRoute,
  profileMeriteSondageRoute,
  grilleProfileMeriteRoute,
  ProfileMeriteCandidateRoute,
  testPlotly,
])

const hashHistory = createHashHistory()

export const router = createRouter({
  routeTree,
  history: hashHistory
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
