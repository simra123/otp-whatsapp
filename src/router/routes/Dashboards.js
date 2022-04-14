import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards

  {
    path: '/dashboard',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  }
]

export default DashboardRoutes
