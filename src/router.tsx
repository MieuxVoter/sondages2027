import {
  createRootRoute,
  createRoute,
  createRouter,
  createHashHistory,
  Outlet,
} from '@tanstack/react-router'
import { App } from './components/App'
import { Majoritaire } from './components/Majoritaire'
import { Building } from './components/Building'
import { TestPlotly } from './components/chart/plotly/TestPlotly'
import { WebTimeMeritChart } from './components/web/chart-page/WebTimeMeritChart'
import { WebRankingChart } from './components/web/chart-page/WebRankingChart'
import { WebMeritChart } from './components/web/chart-page/WebMeritChart'
import { WebTimeMeritGrid } from './components/web/chart-page/WebTimeMeritGrid'
import { Approbation } from './components/Approbation'
import { Landing } from './components/Landing'
import { RankingExperiment } from './components/RankingExperiment'

const rootRoute = createRootRoute({
  component: App,
})

const rootIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Landing,
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
  component: WebTimeMeritGrid,
})

const ProfileMeriteCandidateRoute = createRoute({
  getParentRoute: () => majoritaireRoute,
  path: '/profile-merite-candidate/$candidateId',
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
  component: Approbation,
})

const rankingExperimentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ranking-experiment',
  component: RankingExperiment,
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
    ProfileMeriteCandidateRoute,
  ]),
  uninominalRoute,
  approbationRoute,
  rankingExperimentRoute,
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

