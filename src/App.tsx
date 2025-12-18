
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SigninPage from './Pages/Auth/signin'
import SignupPage from './Pages/Auth/signup'
import ForgotPassword from './Pages/Auth/forgot-password'
import AdminLayout from './components/Layout/AdminLayout'
import ProtectedRoute from './components/Layout/ProtectedRoute'
import Dashboard from './Pages/Dashboard/Dashboard'
import ProjectList from './Pages/Projects/ProjectList'
import EstimationList from './Pages/Estimations/EstimationList'
import EstimationForm from './Pages/Estimations/EstimationForm'
import ProjectForm from './Pages/Projects/ProjectForm'
import ToastMessage from './components/common/toastMessage/ToastMessage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected admin routes */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/add" element={<ProjectForm />} />
            <Route path="/projects/:id" element={<ProjectForm />} />
            <Route path="/estimations" element={<EstimationList />} />
            <Route path="/estimations/add" element={<EstimationForm />} />
            <Route path="/estimations/:id" element={<EstimationForm />} />
          </Route>
        </Routes>
      </Router>

      <ToastMessage />
    </>
  )
}

export default App