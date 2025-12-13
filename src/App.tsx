import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import Home from "./pages/Home";
import IndexPage from "./pages/IndexPage";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AdminManage from "@/pages/AdminManage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ProtectedRoute><IndexPage /></ProtectedRoute>} />
            <Route path="/admin" element={<RoleProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></RoleProtectedRoute>} />
            <Route path="/admin/manage" element={<RoleProtectedRoute allowedRoles={["admin"]}><AdminManage /></RoleProtectedRoute>} />
            <Route path="/teacher" element={<RoleProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></RoleProtectedRoute>} />
            <Route path="/student" element={<RoleProtectedRoute allowedRoles={["student"]}><StudentDashboard /></RoleProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signout" element={<ProtectedRoute><SignOut /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
