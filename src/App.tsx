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
import OurServices from "./pages/OurServices";
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
        data-oid="5e-ephu"
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          data-oid="-y9f.uk"
        ></div>
      </div>
    );
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" data-oid="28yll5p" />;
  }

  // Si el usuario existe pero no ha completado su perfil, redirigir a completar perfil
  if (user && user.profile_completed === false) {
    return <Navigate to="/complete-profile" data-oid=":3un146" />;
  }

  // Si todo está en orden, mostrar el contenido de la ruta
  return <Outlet data-oid="-i9fwo." />;
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
        data-oid="ssdgf6_"
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          data-oid="90jeavp"
        ></div>
      </div>
    );
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" data-oid="wlbwzyp" />;
  }

  // Si el usuario ya completó su perfil, redirigirlo a inicio
  if (user.profile_completed) {
    return <Navigate to="/" data-oid="dse4n_9" />;
  }

  // Si el usuario está logueado pero sin perfil completo, mostrar la página para completarlo
  return <Outlet data-oid="mm5gd8y" />;
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
        data-oid="iggyg73"
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
          data-oid="u93oxd."
        ></div>
      </div>
    );
  }

  // Si no hay usuario o no es administrador, redirigir a la página principal
  if (!user || user.role !== "admin") {
    console.log("Usuario no es admin, redirigiendo a inicio", user);
    return <Navigate to="/" data-oid="epv9snn" />;
  }

  // Para administradores, siempre permitimos acceso al panel de admin independientemente del estado del perfil
  console.log("Usuario admin verificado, mostrando AdminPage", user);

  // Si todo está en orden y es un administrador, mostrar el contenido de la ruta
  return <Outlet data-oid="g79nrav" />;
}

function App() {
  // ID de cliente de Google OAuth - Usar el mismo que está en tu panel de Google Cloud Console
  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "988275836239-hr8p8btrvc1rbb3hcgg37ucgq2vjsbif.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId} data-oid="7yrvgzg">
      <AuthProvider data-oid="6-01h9v">
        <Router data-oid="jqc_ifw">
          <ScrollToTop data-oid="jodyqln" />
          <div className="w-full h-full" data-oid="qp0s79j">
            <Routes data-oid="6hkgtlv">
              {/* Rutas públicas */}
              <Route
                path="/"
                element={<Home data-oid=".mkj:gj" />}
                data-oid="igoo_ei"
              />

              <Route
                path="/landing2"
                element={<Landing2 data-oid="_97fmoa" />}
                data-oid="uou7uty"
              />

              <Route
                path="/login"
                element={<LoginPage data-oid="5-eqmx3" />}
                data-oid="rdfug79"
              />

              <Route
                path="/login-companies"
                element={<LoginCompaniesPage data-oid="x5dbmul" />}
                data-oid="3tejnlb"
              />

              <Route
                path="/register"
                element={<RegisterPage data-oid="04lf-um" />}
                data-oid="lxpdb7d"
              />

              <Route
                path="/register-companies"
                element={<RegisterCompaniesPage data-oid="tsopf8z" />}
                data-oid="81wfxlw"
              />

              <Route
                path="/about"
                element={<AboutUs data-oid="42r-us8" />}
                data-oid="wpf06ul"
              />

              <Route
                path="/drivers"
                element={<Drivers data-oid="2_6_yp1" />}
                data-oid="725ehru"
              />

              <Route
                path="/company-overview"
                element={<CompanyOverview data-oid="nk_t6t6" />}
                data-oid="vp0lz5q"
              />

              <Route
                path="/companies"
                element={<Companies data-oid="6-bc6jv" />}
                data-oid="3hw6p9n"
              />

              <Route
                path="/travel-agencies"
                element={<TravelAgencies data-oid="hyt9yb:" />}
                data-oid="n:wu:ze"
              />

              <Route
                path="/strategic-partnerships"
                element={<StrategicPartnerships data-oid="5uy4ama" />}
                data-oid="f78.zx4"
              />

              <Route
                path="/city-to-city"
                element={<CityToCity data-oid="-eu:-yx" />}
                data-oid="175:n0l"
              />

              <Route
                path="/airport-transfers"
                element={<AirportTransfers data-oid="4dy4nug" />}
                data-oid="8dg-p.0"
              />

              <Route
                path="/hourly-hire"
                element={<HourlyHire data-oid="wi6m1ef" />}
                data-oid=":3mhohf"
              />

              <Route
                path="/special-events"
                element={<SpecialEvents data-oid="j5w8ff2" />}
                data-oid="pjhc3q3"
              />

              <Route
                path="/limousine-service"
                element={<LimousineService data-oid="4fm60xh" />}
                data-oid="yjtwoxt"
              />

              <Route
                path="/private-jets"
                element={<PrivateJets data-oid="23haz-k" />}
                data-oid="-0l72t6"
              />

              <Route
                path="/corporate-transfers"
                element={<CorporateTransfers data-oid="9o4q67h" />}
                data-oid="5s9o5-t"
              />

              <Route
                path="/security-services"
                element={<SecurityServices data-oid="krrd.nt" />}
                data-oid="rgsyc90"
              />

              <Route
                path="/our-services"
                element={<OurServices />}
              />

              {/* Rutas del Blog */}
              <Route
                path="/blog"
                element={<BlogPage data-oid="_gertx6" />}
                data-oid="z5uozzb"
              />

              <Route
                path="/blog/:slug"
                element={<BlogPostPage data-oid="c_c.gux" />}
                data-oid="nszcmy0"
              />

              <Route
                path="/blog/categoria/:category"
                element={<CategoryPage data-oid="s_8xdn1" />}
                data-oid="p5mtxy6"
              />

              <Route
                path="/blog/tag/:tag"
                element={<TagPage data-oid="2jnrvuz" />}
                data-oid="650nrox"
              />

              {/* Ruta para el wizard de reserva */}
              <Route
                path="/reserva/:sessionId"
                element={<BookingWizard data-oid="wb72xh." />}
                data-oid=".fk.zho"
              />

              {/* Ruta para completar perfil */}
              <Route
                element={<ProfileCompletionRoute data-oid=":.csepc" />}
                data-oid="b9_yij3"
              >
                <Route
                  path="/complete-profile"
                  element={<CompleteProfilePage data-oid="70a_3.g" />}
                  data-oid="_-5f2d3"
                />
              </Route>

              {/* Rutas protegidas que requieren autenticación y perfil completo */}
              <Route
                element={<PrivateRoute data-oid="r00ppxd" />}
                data-oid="h0a4teo"
              >
                <Route
                  path="/trips"
                  element={<TripsPage data-oid="t199-i3" />}
                  data-oid="lsz4xb4"
                />

                <Route
                  path="/account"
                  element={<AccountPage data-oid="q_44t83" />}
                  data-oid="nvuuz1q"
                />
              </Route>

              {/* Rutas protegidas exclusivas para administradores */}
              <Route
                element={<AdminRoute data-oid="90ri5tc" />}
                data-oid="8:f:xmr"
              >
                <Route
                  path="/admin"
                  element={<AdminPage data-oid="84_bur:" />}
                  data-oid="doy_-f."
                />
              </Route>

              {/* Ruta de fallback */}
              <Route
                path="*"
                element={<Navigate to="/" data-oid="q9:rlua" />}
                data-oid="usk-a-b"
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
