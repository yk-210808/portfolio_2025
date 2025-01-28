// Router
import { RouteProps, BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import Pages from './pages'

const { Home, Works, Profile, Skills } = Pages()

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/works",
    element: <Works />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/skills",
    element: <Skills />,
  },
] as const satisfies RouteProps[];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }, i) => <Route key={i} path={path} element={element} />)}
      </Routes>
    </BrowserRouter>
  )
}

export default App