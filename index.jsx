import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from './components/Home';
import CountryDetail from "./components/CountryDetail";
import ErrorPage from './components/ErrorPage'
import About from "./components/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement : <ErrorPage />,
    children : [
      {
        path: '/',
        element : <Home />
      },
      {
        path: '/:country',
        element : <CountryDetail />
      },
    ]
  },
  {
    path : '/about',
    element : <About />
  }
]);

const root = createRoot(document.querySelector("#root"));

root.render(<RouterProvider router={router} />);
