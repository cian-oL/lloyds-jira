import { Routes, Route, Navigate } from "react-router-dom";

import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import KanbanLayout from "./layouts/KanbanLayout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import KanbanPage from "./pages/KanbanPage";
import IssueManagementPage from "./pages/IssueManagementPage";
import IssuesBacklogPage from "./pages/IssuesBacklogPage";
import CreateIssuePage from "./pages/CreateIssuePage";

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

        /* === PROFILE PAGE === */

        isLoggedIn && (
          <>
            <Route
              path="/profile"
              element={
                <Layout>
                  <UserProfilePage />
                </Layout>
              }
            />

            {/* === KANABAN PAGES === */}

            <Route
              path="/kanban"
              element={
                <KanbanLayout>
                  <KanbanPage />
                </KanbanLayout>
              }
            />
            <Route
              path="/issues"
              element={
                <Layout>
                  <IssuesBacklogPage />
                </Layout>
              }
            />
            <Route
              path="/issues/create-issue"
              element={
                <Layout>
                  <CreateIssuePage />
                </Layout>
              }
            />
            <Route
              path="/issues/:issueCode"
              element={
                <Layout>
                  <IssueManagementPage />
                </Layout>
              }
            />
          </>
        )
      }
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
