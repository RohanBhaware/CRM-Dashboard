import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Customer from "./pages/Customer";
// import Leads from "./pages/Leads";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./Layout/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Leads from "./pages/Leads";
// import DashboardLayout from "./Layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
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
          path="/customers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Customers />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Leads />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;