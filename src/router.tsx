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
import { WebTimeMeritChart } from './components/web/chart-page/WebTimeMeritChart'
import { WebRankingChart } from './components/web/chart-page/WebRankingChart'
import { WebMeritChart } from './components/web/chart-page/WebMeritChart'

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
  component: WebRankingChart
})

const profileMeriteSondageRoute = createRoute({
  getParentRoute: () => majoritaireRoute,
  path: '/profile-merite-sondage',
  component: WebMeritChart 
})

const grilleProfileMeriteRoute = createRoute({
  getParentRoute: () => majoritaireRoute,
  path: '/grille-profile-merite',
  component: WebTimeMeritChart,
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

export const router = createRouter({
  routeTree,
  basepath: '/france-election-tracking-2027'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

