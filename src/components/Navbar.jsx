import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../context/NotificationContext'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const { pendingClaimsCount } = useNotifications()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className="bg-orange-500 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍱</span>
            <span className="text-xl font-display font-800 tracking-tight">EatYaar</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/" className={`text-sm font-medium hover:text-orange-100 transition ${isActive('/') ? 'underline underline-offset-4' : ''}`}>
              Browse
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/post" className="bg-white text-orange-500 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-orange-50 transition">
                  + Share Food
                </Link>
                <Link to="/claims/inbox" className="relative text-sm font-medium hover:text-orange-100 transition">
                  Inbox
                  {pendingClaimsCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce-in">
                      {pendingClaimsCount > 9 ? '9+' : pendingClaimsCount}
                    </span>
                  )}
                </Link>
                <Link to="/claims/my" className={`text-sm font-medium hover:text-orange-100 transition`}>
                  My Claims
                </Link>
                <Link to="/profile" className={`text-sm font-medium hover:text-orange-100 transition`}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium hover:text-orange-100 transition">
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
              <Link to="/login" className="bg-white text-orange-500 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-orange-50 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-3">
            {isLoggedIn && (
              <Link to="/claims/inbox" className="relative">
                <span className="text-xl">🔔</span>
                {pendingClaimsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce-in">
                    {pendingClaimsCount > 9 ? '9+' : pendingClaimsCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl leading-none"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-orange-600 animate-slide-down">
            <div className="flex flex-col px-4 py-3 gap-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium">Browse Food</Link>
              {isLoggedIn ? (
                <>
                  <Link to="/post" onClick={() => setMenuOpen(false)} className="text-sm font-semibold">+ Share Food</Link>
                  <Link to="/claims/inbox" onClick={() => setMenuOpen(false)} className="text-sm font-medium flex items-center gap-2">
                    Inbox
                    {pendingClaimsCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{pendingClaimsCount}</span>
                    )}
                  </Link>
                  <Link to="/claims/my" onClick={() => setMenuOpen(false)} className="text-sm font-medium">My Claims</Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-sm font-medium">Profile</Link>
                  <button onClick={handleLogout} className="text-sm font-medium text-left">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-semibold">Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}