import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { DashboardPage } from '@/pages/DashboardPage'
import { RoverPage } from '@/pages/RoverPage'
import { SpaceWeatherPage } from '@/pages/SpaceWeatherPage'
import { EarthPage } from '@/pages/EarthPage'
import { AsteroidsPage } from '@/pages/AsteroidsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'rovers', element: <Navigate to="/rovers/curiosity" replace /> },
      { path: 'rovers/:rover', element: <RoverPage /> },
      { path: 'space-weather', element: <SpaceWeatherPage /> },
      { path: 'earth', element: <EarthPage /> },
      { path: 'asteroids', element: <AsteroidsPage /> },
    ],
  },
])
