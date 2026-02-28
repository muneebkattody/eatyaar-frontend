import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-orange-500 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-tight">
        🍱 EatYaar
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline text-sm">Browse</Link>
        {isLoggedIn ? (
          <>
            <Link to="/post" className="bg-white text-orange-500 px-3 py-1 rounded-full text-sm font-semibold hover:bg-orange-100">
              + Share Food
            </Link>
            <Link to="/profile" className="hover:underline text-sm">Profile</Link>
            <button onClick={handleLogout} className="hover:underline text-sm">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-orange-500 px-3 py-1 rounded-full text-sm font-semibold">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
