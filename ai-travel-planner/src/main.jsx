import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import Profile from "./components/custom/Profile";
import MyTrips from "./components/custom/MyTrips";
import Hero from "./components/custom/Hero";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/create-trip",
        element: <CreateTrip />,
      },
      {
        path: "/view-trip/:tripId",
        element: <ViewTrip />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/my-trips",
        element: <MyTrips />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
