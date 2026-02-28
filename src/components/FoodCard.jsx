import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function FoodCard({ listing, onClaimed }) {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleClaim = async () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    try {
      await api.post('/claims', { listingId: listing.id })
      alert('Food claimed! Wait for the giver to approve.')
      if (onClaimed) onClaimed()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not claim. Try again.')
    }
  }

  const foodTypeColor = {
    VEG: 'text-green-600 border-green-500',
    NON_VEG: 'text-red-600 border-red-500',
    BOTH: 'text-yellow-600 border-yellow-500',
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
        <span className={`text-xs border rounded-full px-2 py-0.5 font-medium ${foodTypeColor[listing.foodType]}`}>
          {listing.foodType.replace('_', ' ')}
        </span>
      </div>

      {/* Description */}
      {listing.description && (
        <p className="text-sm text-gray-500">{listing.description}</p>
      )}

      {/* Details */}
      <div className="text-sm text-gray-600 grid grid-cols-2 gap-1">
        <span>🍽️ {listing.servings} servings</span>
        <span>📍 {listing.areaName}, {listing.city}</span>
        <span>⏰ Pickup by {new Date(listing.pickupBy).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span>⭐ Trust: {listing.postedByTrustScore?.toFixed(1) || 'New'}</span>
      </div>

      {/* Posted by */}
      <p className="text-xs text-gray-400">Posted by {listing.postedByName || 'Anonymous'}</p>

      {/* Claim button */}
      {listing.status === 'AVAILABLE' && (
        <button
          onClick={handleClaim}
          className="mt-1 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition"
        >
          Claim This Food
        </button>
      )}

      {listing.status !== 'AVAILABLE' && (
        <div className="mt-1 w-full text-center text-sm text-gray-400 py-2 bg-gray-50 rounded-xl">
          {listing.status === 'CLAIMED' ? '✅ Already Claimed' : '❌ Not Available'}
        </div>
      )}
    </div>
  )
}
