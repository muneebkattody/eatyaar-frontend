import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
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
      <BrowserRouter>
        <Navbar />
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
    </AuthProvider>
  )
}