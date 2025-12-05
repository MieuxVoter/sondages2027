import {
  createRootRoute,
  createRoute,
  createRouter,
  createHashHistory,
  redirect,
  Outlet,
} from '@tanstack/react-router'
import { App } from './application/App'
import { Majoritaire } from './application/Majoritaire'
import { Building } from './application/Building'
import { WebTimeMeritChart } from './application/web/chart-page/WebTimeMeritChart'
import { WebRankingChart } from './application/web/chart-page/WebRankingChart'
import { WebMeritChart } from './application/web/chart-page/WebMeritChart'
import { WebTimeMeritGrid } from './application/web/chart-page/WebTimeMeritGrid'
import { Approbation } from './application/Approbation'
import { WebApprovalRankingChart } from './application/web/chart-page/WebApprovalRankingChart'
import { WebApprovalRateChart } from './application/web/chart-page/WebApprovalRateChart'
import { WebApprovalEvolutionChart } from './application/web/chart-page/WebApprovalEvolutionChart'

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
  component: Outlet,
})

const approbationIndexRoute = createRoute({
  getParentRoute: () => approbationRoute,
  path: '/',
  component: Approbation,
})

const approbationEvolutionClassementRoute = createRoute({
  getParentRoute: () => approbationRoute,
  path: '/evolution-classement',
  component: WebApprovalRankingChart
})

const approbationTauxApprobationRoute = createRoute({
  getParentRoute: () => approbationRoute,
  path: '/taux-approbation',
  component: WebApprovalRateChart
})

const approbationEvolutionTauxApprobationRoute = createRoute({
  getParentRoute: () => approbationRoute,
  path: '/evolution-taux-approbation',
  component: WebApprovalEvolutionChart
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
  approbationRoute.addChildren([
    approbationIndexRoute,
    approbationEvolutionClassementRoute,
    approbationTauxApprobationRoute,
    approbationEvolutionTauxApprobationRoute,
  ]),
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

