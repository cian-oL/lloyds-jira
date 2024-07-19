import { Routes, Route } from "react-router-dom";

import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <Layout>
            <SignInPage />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />

      {
        /* === AUTHENTICATION REQUIRED === */
        isLoggedIn && (
          <Route
            path="/profile"
            element={
              <Layout>
                <UserProfilePage />
              </Layout>
            }
          />
        )
      }
    </Routes>
  );
};

export default App;
