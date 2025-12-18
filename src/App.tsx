
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const ProtectedRoute = lazy(() => import('./components/Layout/ProtectedRoute'))

// Lazy load pages and heavy components
const SigninPage = lazy(() => import('./Pages/Auth/signin'))
const SignupPage = lazy(() => import('./Pages/Auth/signup'))
const ForgotPassword = lazy(() => import('./Pages/Auth/forgot-password'))
const AdminLayout = lazy(() => import('./components/Layout/AdminLayout'))
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'))
const ProjectList = lazy(() => import('./Pages/Projects/ProjectList'))
const EstimationList = lazy(() => import('./Pages/Estimations/EstimationList'))
const EstimationForm = lazy(() => import('./Pages/Estimations/EstimationForm'))
const ProjectForm = lazy(() => import('./Pages/Projects/ProjectForm'))
const ToastMessage = lazy(() => import('./components/common/toastMessage/ToastMessage'))

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div className="p-6">Loading...</div>}>
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
        </Suspense>
      </Router>

      <Suspense fallback={null}><ToastMessage /></Suspense>
    </>
  )
}

export default App