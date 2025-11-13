import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";

import Home from "./components/main-pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/user/Profile";
import CropRecommendation from "./pages/tools/CropRecommendation";
import SoilAnalysis from "./pages/tools/SoilAnalysis";
import OrganicTips from "./pages/tools/OrganicTips";
import CropCalendar from "./pages/tools/CropCalendar";
import AIChat from "./pages/tools/AIChat";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC PAGES (Navbar visible) */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        {/* DASHBOARD (Navbar hidden, Sidebar visible) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/crop-recommendation"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CropRecommendation/>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/soil-analysis" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SoilAnalysis/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
        />

        <Route 
        path="/dashboard/organic-tips" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <OrganicTips/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
        />

        <Route 
        path="/dashboard/crop-calendar" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CropCalendar/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
        />

        <Route 
        path="/dashboard/assistant" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AIChat/>
            </DashboardLayout>
          </ProtectedRoute>
        } 
        />
      </Routes>
    </Router>
  );
}
