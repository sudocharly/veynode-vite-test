import { Route, Routes } from 'react-router'
import { Shell } from './components/Shell.tsx'
import { AssetsPage } from './pages/AssetsPage.tsx'
import { MissingPage } from './pages/MissingPage.tsx'
import { Overview } from './pages/Overview.tsx'
import { RouteCheck } from './pages/RouteCheck.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Overview />} />
        <Route path="routes" element={<RouteCheck />} />
        <Route path="routes/nested" element={<RouteCheck />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  )
}
