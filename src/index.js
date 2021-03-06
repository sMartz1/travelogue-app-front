import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import App from "./App";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import "mapbox-gl/dist/mapbox-gl.css";
import { AuthProvider } from "./components/Context/userContext";
Amplify.configure(awsExports);
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
