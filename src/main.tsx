import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/privyde.css";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode data-oid="itkiocq">
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      data-oid="4p9ptqy"
    >
      <AuthProvider data-oid="4xvvysn">
        <App data-oid="e87:lk9" />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
