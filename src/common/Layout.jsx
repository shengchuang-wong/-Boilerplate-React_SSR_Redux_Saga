import React, { Fragment } from 'react'
import { renderRoutes } from 'react-router-config'
import { routes } from './routes'

export default function Layout() {
  return <Fragment>{renderRoutes(routes[0].routes)}</Fragment>
}
