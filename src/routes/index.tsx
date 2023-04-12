import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
