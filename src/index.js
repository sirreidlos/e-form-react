import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./routes/App";

import ErrorPage from "./ErrorPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Form from "./routes/Form";

import ApiClient from "./tools/ApiClient";
// import dotenv from "dotenv";

// dotenv.config();

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
