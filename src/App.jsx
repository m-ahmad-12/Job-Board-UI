import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import BookMark from './pages/BookMark';
import Layout from "./components/layout";
import NotFound from "./pages/NotFound";
function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  
    children: [
{path: '/', element:   <Home/>},
{path: '/job/:id', element:   <JobDetail/>},
{path:'/bookmark', element:<BookMark/>},
{path: '*', element:    <NotFound/>}
    ]
  }
])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
