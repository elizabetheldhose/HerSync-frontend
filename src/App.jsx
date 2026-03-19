import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ FIX: React.lazy + code splitting (resume claim: "React lazy loading and code splitting")
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const TasksPage = lazy(() => import("./Pages/TasksPage"));
const FinancePage = lazy(() => import("./Pages/FinancePage"));
const HealthPage = lazy(() => import("./Pages/HealthPage"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import { ThemeProvider } from "./context/ThemeContext";
import { TasksProvider } from "./context/TasksContext";
import { FinanceProvider } from "./context/FinanceContext";
import { HealthProvider } from "./context/HealthContext";
import { ProfileProvider } from "./context/ProfileContext";
import { AuthProvider } from "./context/AuthContext";

// ✅ FIX: Suspense fallback shown while lazy chunks load
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blush">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-softRose border-t-transparent animate-spin" />
        <p className="text-mutedText text-sm">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TasksProvider>
          <FinanceProvider>
            <HealthProvider>
              <ProfileProvider>
                <BrowserRouter>
                  {/* ✅ Suspense wraps all lazy routes */}
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* ===== PUBLIC ROUTES (NO SIDEBAR) ===== */}
                      <Route path="/" element={<Login />} />
                      <Route path="/register" element={<Register />} />

                      {/* ===== PRIVATE ROUTES (WITH SIDEBAR) ===== */}
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <Layout />
                          </ProtectedRoute>
                        }
                      >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="tasks" element={<TasksPage />} />
                        <Route path="finance" element={<FinancePage />} />
                        <Route path="health" element={<HealthPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </ProfileProvider>
            </HealthProvider>
          </FinanceProvider>
        </TasksProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
