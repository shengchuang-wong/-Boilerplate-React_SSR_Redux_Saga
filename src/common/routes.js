import loadable from '@loadable/component'
import { matchRoutes } from 'react-router-config'
import { fetchUsers } from 'client/actions'

const Users = loadable(() =>
  import(
    /* webpackChunkName: "users-page" */
    '../client/pages/Users/Users'
  )
)
const Home = loadable(() =>
  import(/* webpackChunkName: "home-page" */ '../client/pages/Home/Home')
)
const NotFound = loadable(() =>
  import(
    /* webpackChunkName: "notfound-page" */ '../client/pages/NotFound/NotFound'
  )
)
const Sample = loadable(() =>
  import(
    /* webpackChunkName: "sample-page" */

    '../client/pages/Sample/Sample'
  )
)

export const routes = [
  {
    loadData: undefined,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/users',
        fetchInitialData: store => {
          return store.dispatch(fetchUsers())
        },
        component: Users
      },
      {
        path: '/sample',
        component: Sample
      },
      {
        ...NotFound
      }
    ]
  }
]

export default function getData(path, store) {
  const matches = matchRoutes(routes, path)
  const matchRoute = matches
    .filter(m => !!m.route.fetchInitialData)
    .map(m => m.route.fetchInitialData(store))
  return matchRoute
}
