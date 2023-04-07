import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./routes/App";

import ErrorPage from "./ErrorPage";
import Form from "./routes/Form";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Response from "./routes/Response";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new",
    element: <Form />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit/:id",
    element: <Form />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/form/:id",
    element: <Form />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/response/:id",
    element: <Response />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
