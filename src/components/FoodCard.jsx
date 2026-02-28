import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'

export default function FoodCard({ listing, onClaimed }) {
  const { isLoggedIn } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleClaim = async () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    try {
      await api.post('/claims', { listingId: listing.id })
      toast.success('Food claimed! Waiting for giver to approve.')
      if (onClaimed) onClaimed()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not claim. Try again.')
    }
  }

  const timeLeft = () => {
    const diff = new Date(listing.pickupBy) - new Date()
    if (diff <= 0) return 'Expired'
    const hours = Math.floor(diff / 3600000)
    const mins = Math.floor((diff % 3600000) / 60000)
    if (hours > 0) return `${hours}h ${mins}m left`
    return `${mins}m left`
  }

  const isUrgent = () => {
    const diff = new Date(listing.pickupBy) - new Date()
    return diff > 0 && diff < 3600000 // less than 1 hour
  }

  const foodTypeConfig = {
    VEG:     { color: 'text-green-600 bg-green-50 border-green-200', dot: 'bg-green-500', label: 'Veg' },
    NON_VEG: { color: 'text-red-600 bg-red-50 border-red-200',       dot: 'bg-red-500',   label: 'Non-Veg' },
    BOTH:    { color: 'text-amber-600 bg-amber-50 border-amber-200', dot: 'bg-amber-500', label: 'Veg + Non-Veg' },
  }
  const ftConfig = foodTypeConfig[listing.foodType] || foodTypeConfig.VEG

  return (
    <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in">
      {/* Top color strip based on food type */}
      <div className={`h-1 w-full ${listing.foodType === 'VEG' ? 'bg-green-400' : listing.foodType === 'NON_VEG' ? 'bg-red-400' : 'bg-amber-400'}`} />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-700 text-gray-900 text-base leading-tight">{listing.title}</h3>
          <span className={`shrink-0 text-xs border rounded-full px-2 py-0.5 font-medium flex items-center gap-1 ${ftConfig.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${ftConfig.dot}`} />
            {ftConfig.label}
          </span>
        </div>

        {/* Description */}
        {listing.description && (
          <p className="text-sm text-gray-500 mb-3 leading-relaxed">{listing.description}</p>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-y-1.5 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1.5">
            <span className="text-base">🍽️</span>
            <span>{listing.servings} servings</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-base">📍</span>
            <span className="truncate">{listing.areaName}</span>
          </span>
          <span className={`flex items-center gap-1.5 ${isUrgent() ? 'text-red-500 font-semibold' : ''}`}>
            <span className="text-base">{isUrgent() ? '🔥' : '⏰'}</span>
            <span>{timeLeft()}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-base">⭐</span>
            <span>{listing.postedByTrustScore > 0 ? listing.postedByTrustScore.toFixed(1) : 'New'}</span>
          </span>
        </div>

        {/* Posted by */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-xs">🧑</span>
            {listing.postedByName || 'Anonymous'}
          </p>

          {listing.status === 'AVAILABLE' ? (
            <button
              onClick={handleClaim}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-150"
            >
              Claim →
            </button>
          ) : (
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {listing.status === 'CLAIMED' ? 'Claimed' : 'Unavailable'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}