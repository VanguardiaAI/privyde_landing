import "./App.css";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Drivers from "./pages/Drivers";
import CompanyOverview from "./pages/CompanyOverview";
import Companies from "./pages/Companies";
import TravelAgencies from "./pages/TravelAgencies";
import StrategicPartnerships from "./pages/StrategicPartnerships";
import CityToCity from "./pages/CityToCity";
import AirportTransfers from "./pages/AirportTransfers";
import HourlyHire from "./pages/HourlyHire";
import SpecialEvents from "./pages/SpecialEvents";
import LimousineService from "./pages/LimousineServices";
import PrivateJets from "./pages/PrivateJets";
import CorporateTransfers from "./pages/CorporateTransfers";
import SecurityServices from "./pages/SecurityServices";
import Landing2 from "./pages/Landing2";
import LoginPage from "./pages/LoginPage";
import LoginCompaniesPage from "./pages/LoginCompaniesPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterCompaniesPage from "./pages/RegisterCompaniesPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import TripsPage from "./pages/TripsPage";
import AccountPage from "./pages/AccountPage";
import BookingWizard from "./pages/BookingWizard";
import AdminPage from "./pages/AdminPage";
// Blog pages
import BlogPage from "./pages/blog/BlogPage";
import BlogPostPage from "./pages/blog/BlogPostPage";
import CategoryPage from "./pages/blog/CategoryPage";
import TagPage from "./pages/blog/TagPage";
// import HowItWorks from './pages/HowItWorks'; // Removed import
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScrollToTop from "./components/ScrollToTop";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";

// Componente para rutas protegidas
function PrivateRoute() {
  const { user, isLoading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Cuando termina la carga de autenticación, dejamos de revisar
    if (!isLoading) {
      setChecking(false);
    }
  }, [isLoading]);

  if (checking || isLoading) {
    // Mientras carga, mostrar spinner
    return (
      <div
        className="flex items-center justify-center h-screen"
        data-oid="2cm8vfj"
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          data-oid="34b0azz"
        ></div>
      </div>
    );
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" data-oid=".fep5:v" />;
  }

  // Si el usuario existe pero no ha completado su perfil, redirigir a completar perfil
  if (user && user.profile_completed === false) {
    return <Navigate to="/complete-profile" data-oid="x7p506i" />;
  }

  // Si todo está en orden, mostrar el contenido de la ruta
  return <Outlet data-oid="4m2rq-r" />;
}

// Ruta para usuarios que deben completar su perfil
function ProfileCompletionRoute() {
  const { user, isLoading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Cuando termina la carga de autenticación, dejamos de revisar
    if (!isLoading) {
      setChecking(false);
    }
  }, [isLoading]);

  if (checking || isLoading) {
    // Mientras carga, mostrar spinner
    return (
      <div
        className="flex items-center justify-center h-screen"
        data-oid="605nyl6"
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          data-oid="6h3sipq"
        ></div>
      </div>
    );
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" data-oid="o9-9mvh" />;
  }

  // Si el usuario ya completó su perfil, redirigirlo a inicio
  if (user.profile_completed) {
    return <Navigate to="/" data-oid="4mme5cn" />;
  }

  // Si el usuario está logueado pero sin perfil completo, mostrar la página para completarlo
  return <Outlet data-oid="t-ib9yf" />;
}

// Componente para rutas exclusivas de administradores
function AdminRoute() {
  const { user, isLoading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Cuando termina la carga de autenticación, dejamos de revisar
    if (!isLoading) {
      setChecking(false);
    }
  }, [isLoading]);

  if (checking || isLoading) {
    // Mientras carga, mostrar spinner
    return (
      <div
        className="flex items-center justify-center h-screen"
        data-oid="dl-vmal"
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          data-oid="7w:ti4u"
        ></div>
      </div>
    );
  }

  // Si no hay usuario o no es administrador, redirigir a la página principal
  if (!user || user.role !== "admin") {
    console.log("Usuario no es admin, redirigiendo a inicio", user);
    return <Navigate to="/" data-oid="su-q6gz" />;
  }

  // Para administradores, siempre permitimos acceso al panel de admin independientemente del estado del perfil
  console.log("Usuario admin verificado, mostrando AdminPage", user);

  // Si todo está en orden y es un administrador, mostrar el contenido de la ruta
  return <Outlet data-oid="joatj2b" />;
}

function App() {
  // ID de cliente de Google OAuth - Usar el mismo que está en tu panel de Google Cloud Console
  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "988275836239-hr8p8btrvc1rbb3hcgg37ucgq2vjsbif.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId} data-oid="o2:tq81">
      <AuthProvider data-oid="iv1xcfr">
        <Router data-oid="jhxbumj">
          <ScrollToTop data-oid="41nrqyc" />
          <div className="w-full h-full" data-oid="qo_b2xc">
            <Routes data-oid=":nfr:zn">
              {/* Rutas públicas */}
              <Route
                path="/"
                element={<Home data-oid="li6lcco" />}
                data-oid=":2s9jod"
              />

              <Route
                path="/landing2"
                element={<Landing2 data-oid="7r-ew4e" />}
                data-oid=".bxncqk"
              />

              <Route
                path="/login"
                element={<LoginPage data-oid="633_xee" />}
                data-oid="lfnjj8q"
              />

              <Route
                path="/login-companies"
                element={<LoginCompaniesPage data-oid="pt5xb7q" />}
                data-oid="flntt.:"
              />

              <Route
                path="/register"
                element={<RegisterPage data-oid="guxff1-" />}
                data-oid="__imb1w"
              />

              <Route
                path="/register-companies"
                element={<RegisterCompaniesPage data-oid="_c3hp5t" />}
                data-oid=".n7fc8h"
              />

              <Route
                path="/about"
                element={<AboutUs data-oid="-z:c7zq" />}
                data-oid="tdpph-9"
              />

              <Route
                path="/drivers"
                element={<Drivers data-oid="49qqcu0" />}
                data-oid="lkgwrns"
              />

              <Route
                path="/company-overview"
                element={<CompanyOverview data-oid="c:g9ao." />}
                data-oid="8fhz6yg"
              />

              <Route
                path="/companies"
                element={<Companies data-oid="dvxfwxp" />}
                data-oid="lzihj9l"
              />

              <Route
                path="/travel-agencies"
                element={<TravelAgencies data-oid="t7th2v6" />}
                data-oid="ljifi2t"
              />

              <Route
                path="/strategic-partnerships"
                element={<StrategicPartnerships data-oid="vd.uivu" />}
                data-oid="i7yw4.u"
              />

              <Route
                path="/city-to-city"
                element={<CityToCity data-oid="mwcqnvh" />}
                data-oid="rsu7s6a"
              />

              <Route
                path="/airport-transfers"
                element={<AirportTransfers data-oid="0-0ofgp" />}
                data-oid="dvfqs6i"
              />

              <Route
                path="/hourly-hire"
                element={<HourlyHire data-oid="-ywes2h" />}
                data-oid="nmbmkvg"
              />

              <Route
                path="/special-events"
                element={<SpecialEvents data-oid="4g01n1j" />}
                data-oid="6ko-y8d"
              />

              <Route
                path="/limousine-service"
                element={<LimousineService data-oid="3snv0ts" />}
                data-oid="468mrsu"
              />

              <Route
                path="/private-jets"
                element={<PrivateJets data-oid="5lqq_40" />}
                data-oid="q3e5kps"
              />

              <Route
                path="/corporate-transfers"
                element={<CorporateTransfers data-oid=":tp91g8" />}
                data-oid="rc:ee7:"
              />

              <Route
                path="/security-services"
                element={<SecurityServices data-oid="yoieu33" />}
                data-oid="3iuy:v_"
              />

              {/* Rutas del Blog */}
              <Route
                path="/blog"
                element={<BlogPage data-oid="vpqa_2k" />}
                data-oid="gt_1nv3"
              />

              <Route
                path="/blog/:slug"
                element={<BlogPostPage data-oid="-jj:bl8" />}
                data-oid="pnf.d:u"
              />

              <Route
                path="/blog/categoria/:category"
                element={<CategoryPage data-oid="h_c5njt" />}
                data-oid="-v4ptx2"
              />

              <Route
                path="/blog/tag/:tag"
                element={<TagPage data-oid="kchtpph" />}
                data-oid="b.hykz6"
              />

              {/* Ruta para el wizard de reserva */}
              <Route
                path="/reserva/:sessionId"
                element={<BookingWizard data-oid="9d5ig.-" />}
                data-oid="ackwa8e"
              />

              {/* Ruta para completar perfil */}
              <Route
                element={<ProfileCompletionRoute data-oid="92_u35g" />}
                data-oid="svwtnlk"
              >
                <Route
                  path="/complete-profile"
                  element={<CompleteProfilePage data-oid="vgf0744" />}
                  data-oid="da3:n:m"
                />
              </Route>

              {/* Rutas protegidas que requieren autenticación y perfil completo */}
              <Route
                element={<PrivateRoute data-oid="oqfdgbf" />}
                data-oid="9.vaxn8"
              >
                <Route
                  path="/trips"
                  element={<TripsPage data-oid="mtk6pk9" />}
                  data-oid="n1u.4.3"
                />

                <Route
                  path="/account"
                  element={<AccountPage data-oid="yti8z7y" />}
                  data-oid="odfzz7j"
                />
              </Route>

              {/* Rutas protegidas exclusivas para administradores */}
              <Route
                element={<AdminRoute data-oid="y9tl.1t" />}
                data-oid="jdsm22t"
              >
                <Route
                  path="/admin"
                  element={<AdminPage data-oid="fqas.a-" />}
                  data-oid=":7i2f69"
                />
              </Route>

              {/* Ruta de fallback */}
              <Route
                path="*"
                element={<Navigate to="/" data-oid="iiuu_vy" />}
                data-oid="q28lc0a"
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
