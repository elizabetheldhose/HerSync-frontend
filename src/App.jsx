import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import TasksPage from "./Pages/TasksPage";
import FinancePage from "./Pages/FinancePage";
import HealthPage from "./Pages/HealthPage";
import ProfilePage from "./Pages/ProfilePage";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import { ThemeProvider } from "./context/ThemeContext";
import { TasksProvider } from "./context/TasksContext";
import { FinanceProvider } from "./context/FinanceContext";
import { HealthProvider } from "./context/HealthContext";
import { ProfileProvider } from "./context/ProfileContext";

function App() {
  return (
    <ThemeProvider>

      <TasksProvider>
        <FinanceProvider>
          <HealthProvider>
            <ProfileProvider>

              <BrowserRouter>

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

              </BrowserRouter>

            </ProfileProvider>
          </HealthProvider>
        </FinanceProvider>
      </TasksProvider>

    </ThemeProvider>
  );
}

export default App;
