import { useState, useEffect } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function ProfilePage() {
  const { user } = useAuth()
  const toast = useToast()
  const [profile, setProfile] = useState(null)
  const [claims, setClaims] = useState([])
  const [myListings, setMyListings] = useState([])
  const [tab, setTab] = useState('impact')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, claimsRes, listingsRes] = await Promise.all([
          api.get('/users/me'),
          api.get('/claims/my'),
          api.get('/listings/my'),
        ])
        setProfile(profileRes.data)
        setClaims(claimsRes.data)
        setMyListings(listingsRes.data)
      } catch {
        toast.error('Could not load profile.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleMarkPickedUp = async (claimId) => {
    try {
      await api.patch(`/claims/${claimId}/picked-up`)
      toast.success('Marked as picked up!')
      setClaims(claims.map(c => c.id === claimId ? { ...c, status: 'PICKED_UP' } : c))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update')
    }
  }

  // Calculate impact metrics
  const mealsGiven = profile?.totalGiven || 0
  const mealsTaken = profile?.totalTaken || 0
  const co2Saved = (mealsGiven * 0.5).toFixed(1) // rough estimate: 0.5kg CO2 per meal
  const waterSaved = (mealsGiven * 80).toFixed(0) // rough estimate: 80L water per meal

  const statusStyle = {
    PENDING:   'bg-yellow-100 text-yellow-700',
    APPROVED:  'bg-green-100 text-green-700',
    REJECTED:  'bg-red-100 text-red-500',
    PICKED_UP: 'bg-blue-100 text-blue-700',
  }

  const approvedClaims = claims.filter(c => c.status === 'APPROVED')

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pb-10" style={{ background: '#FFF8F0' }}>

      {/* Profile header */}
      <div className="bg-orange-500 px-4 pt-8 pb-16">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
            🧑
          </div>
          <div className="text-white">
            <h2 className="font-display font-700 text-xl">{profile?.name || 'Yaar'}</h2>
            <p className="text-orange-100 text-sm mt-0.5">{profile?.area}, {profile?.city}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-300 text-sm">⭐</span>
              <span className="text-white text-sm font-semibold">
                {profile?.trustScore > 0 ? profile.trustScore.toFixed(1) : 'New'}
              </span>
              <span className="text-orange-200 text-xs ml-1">trust score</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">

        {/* Approved claims alert — if any */}
        {approvedClaims.length > 0 && (
          <div className="bg-green-500 text-white rounded-2xl p-4 mb-4 animate-bounce-in shadow-lg">
            <p className="font-display font-700 text-base">🎉 {approvedClaims.length} claim{approvedClaims.length > 1 ? 's' : ''} approved!</p>
            <p className="text-sm text-green-100 mt-0.5">Go pick up your food before time runs out.</p>
            <button
              onClick={() => setTab('claims')}
              className="mt-2 text-xs bg-white text-green-600 font-semibold px-3 py-1 rounded-full"
            >
              View Details →
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden mb-4">
          <div className="flex border-b border-gray-100">
            {['impact', 'claims', 'listings'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-semibold capitalize transition ${
                  tab === t
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t === 'impact' && '🌍 '}
                {t === 'claims' && '📋 '}
                {t === 'listings' && '🍱 '}
                {t}
              </button>
            ))}
          </div>

          <div className="p-4">

            {/* Impact tab */}
            {tab === 'impact' && (
              <div className="animate-fade-in">
                <p className="text-sm text-gray-500 mb-4 text-center">Your contribution to reducing food waste</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-orange-50 rounded-2xl p-4 text-center">
                    <p className="font-display font-800 text-3xl text-orange-500">{mealsGiven}</p>
                    <p className="text-xs text-gray-500 mt-1">Meals Given</p>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-4 text-center">
                    <p className="font-display font-800 text-3xl text-orange-500">{mealsTaken}</p>
                    <p className="text-xs text-gray-500 mt-1">Meals Taken</p>
                  </div>
                </div>

                {mealsGiven > 0 && (
                  <div className="bg-green-50 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-green-700 mb-3 text-center">🌱 Environmental Impact</p>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <p className="font-display font-700 text-green-600 text-xl">{co2Saved}kg</p>
                        <p className="text-xs text-gray-500">CO₂ Saved</p>
                      </div>
                      <div>
                        <p className="font-display font-700 text-green-600 text-xl">{waterSaved}L</p>
                        <p className="text-xs text-gray-500">Water Saved</p>
                      </div>
                    </div>
                  </div>
                )}

                {mealsGiven === 0 && mealsTaken === 0 && (
                  <div className="text-center py-6">
                    <p className="text-4xl mb-3">🌱</p>
                    <p className="text-sm text-gray-500">Start sharing food to see your impact here.</p>
                  </div>
                )}
              </div>
            )}

            {/* Claims tab */}
            {tab === 'claims' && (
              <div className="flex flex-col gap-3 animate-fade-in">
                {claims.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8">You haven't claimed any food yet.</p>
                )}
                {claims.map(claim => (
                  <div key={claim.id} className="border border-gray-100 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-semibold text-sm text-gray-800">{claim.listingTitle}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[claim.status]}`}>
                        {claim.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">📍 {claim.listingAreaName}</p>
                    {(claim.status === 'APPROVED' || claim.status === 'PICKED_UP') && (
                      <p className="text-xs text-green-600 mt-1">🏠 {claim.exactAddress}</p>
                    )}
                    {claim.status === 'APPROVED' && (
                      <button
                        onClick={() => handleMarkPickedUp(claim.id)}
                        className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded-xl transition"
                      >
                        Mark as Picked Up ✅
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Listings tab */}
            {tab === 'listings' && (
              <div className="flex flex-col gap-3 animate-fade-in">
                {myListings.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8">You haven't shared any food yet.</p>
                )}
                {myListings.map(listing => (
                  <div key={listing.id} className="border border-gray-100 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-gray-800">{listing.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        listing.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                        listing.status === 'CLAIMED'   ? 'bg-yellow-100 text-yellow-700' :
                        listing.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {listing.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">🍽️ {listing.servings} servings · 📍 {listing.areaName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}