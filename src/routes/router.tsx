import {
  Outlet,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>{' '}
        <Link to="/info" className="[&.active]:font-bold">
          Info
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return <div className="p-2">Hello from About!</div>
  },
})

const infoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info',
  component: function Info() {
    return (
      <div className="p-2">
        <h3>Info Page</h3>
        <div className="flex gap-2 mt-2">
          <Link to="/info/details" className="[&.active]:font-bold text-blue-500">
            Details
          </Link>
        </div>
        <hr className="my-2" />
        <Outlet />
      </div>
    )
  },
})

const infoDetailsRoute = createRoute({
  getParentRoute: () => infoRoute,
  path: '/details',
  component: function InfoDetails() {
    return <div className="p-2 bg-gray-100">This is the details section inside Info!</div>
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

