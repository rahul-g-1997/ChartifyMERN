// Import necessary dependencies
import * as React from "react";
import "./index.css";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./rtk/store";
import App from "./App";
import { Error } from "./pages";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

// Create root element and root instance
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Create browser router and routes
const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}></Route>
  )
);

// Render the application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);
