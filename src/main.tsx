import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/privyde.css";
import "./i18n";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode data-oid="g.wdg98">
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      data-oid="z.p95o7"
    >
      <AuthProvider data-oid="amm.f:n">
        <App data-oid="zxnhn7l" />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
