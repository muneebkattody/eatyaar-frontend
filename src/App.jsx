import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { NotificationProvider } from './context/NotificationContext'
import Navbar from './components/Navbar'
import ClaimBanner from './components/ClaimBanner'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PostFoodPage from './pages/PostFoodPage'
import ProfilePage from './pages/ProfilePage'
import ClaimsInboxPage from './pages/ClaimsInboxPage'
import MyClaimsPage from './pages/MyClaimsPage'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Navbar />
            <ClaimBanner />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/post" element={
                <ProtectedRoute><PostFoodPage /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              } />
              <Route path="/claims/inbox" element={
                <ProtectedRoute><ClaimsInboxPage /></ProtectedRoute>
              } />
              <Route path="/claims/my" element={
                <ProtectedRoute><MyClaimsPage /></ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </ToastProvider>
    </AuthProvider>
  )
}