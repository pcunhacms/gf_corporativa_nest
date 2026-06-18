import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { authStore } from "./store/auth.store";
import "./index.css";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

if (token && user) {
  authStore.setState({
    token,
    user: JSON.parse(user),
  });
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);