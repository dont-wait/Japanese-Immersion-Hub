import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { StudySessionProvider } from './contexts/StudySessionContext';
import { ToastProvider } from './contexts/ToastContext';

// Layouts
import LearnerLayout from './components/layout/LearnerLayout';
import AdminLayout from './components/layout/AdminLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import OAuthCallback from './pages/auth/OAuthCallback';

// Public
import LandingPage from './pages/LandingPage';

// Learner pages
import Dashboard from './pages/learner/Dashboard';
import StudySession from './pages/learner/StudySession';
import Dictionary from './pages/learner/Dictionary';
import Leaderboard from './pages/learner/Leaderboard';
import Profile from './pages/learner/Profile';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManage from './pages/admin/UserManage';
import SystemLogs from './pages/admin/SystemLogs';

// Creator pages
import VocabEditor from './pages/creator/VocabEditor';
import ManageContributions from './pages/creator/ManageContributions';

// ===== Route Guards =====
function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/learn" replace />;
  return children;
}

function RequireCreator({ children }) {
  const { isAuthenticated, isCreator, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isCreator) return <Navigate to="/learn" replace />;
  return children;
}

function GuestOnly({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return !isAuthenticated ? children : <Navigate to="/learn" replace />;
}

// ===== App Routing =====
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <StudySessionProvider>
              <Routes>
                {/* ── Public ── */}
                <Route path="/" element={<LandingPage />} />

                {/* ── Auth (guest only) ── */}
                <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
                <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />
                <Route path="/forgot-password" element={<GuestOnly><ForgotPassword /></GuestOnly>} />
                <Route path="/auth" element={<OAuthCallback />} />

                {/* ── Learner (auth required) ── */}
                <Route path="/learn" element={<RequireAuth><LearnerLayout /></RequireAuth>}>
                  <Route index element={<Dashboard />} />
                  <Route path="study" element={<StudySession />} />
                  <Route path="dictionary" element={<Dictionary />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* ── Admin (admin only) ── */}
                <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<UserManage />} />
                  <Route path="logs" element={<SystemLogs />} />
                </Route>

                {/* ── Creator (creator/admin only) ── */}
                <Route path="/creator" element={<RequireCreator><LearnerLayout /></RequireCreator>}>
                  <Route index element={<VocabEditor />} />
                  <Route path="contributions" element={<ManageContributions />} />
                </Route>

                {/* ── Fallback ── */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </StudySessionProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
