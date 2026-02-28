import { useState, useEffect } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [claims, setClaims] = useState([])
  const [myListings, setMyListings] = useState([])
  const [tab, setTab] = useState('claims') // 'claims' | 'listings'
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
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleApproveClaim = async (claimId) => {
    try {
      await api.patch(`/claims/${claimId}/approve`)
      alert('Claim approved! Address is now visible to the taker.')
      setClaims(claims.map(c => c.id === claimId ? { ...c, status: 'APPROVED' } : c))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve')
    }
  }

  const handleRejectClaim = async (claimId) => {
    try {
      await api.patch(`/claims/${claimId}/reject`)
      setClaims(claims.map(c => c.id === claimId ? { ...c, status: 'REJECTED' } : c))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject')
    }
  }

  const handleMarkPickedUp = async (claimId) => {
    try {
      await api.patch(`/claims/${claimId}/picked-up`)
      alert('Marked as picked up!')
      setClaims(claims.map(c => c.id === claimId ? { ...c, status: 'PICKED_UP' } : c))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update')
    }
  }

  const claimStatusColor = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-600',
    PICKED_UP: 'bg-blue-100 text-blue-700',
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Profile Card */}
        {profile && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                🧑
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{profile.name || 'User'}</h2>
                <p className="text-sm text-gray-500">{profile.area}, {profile.city}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-5 text-center">
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-2xl font-bold text-orange-500">{profile.trustScore?.toFixed(1) || '—'}</p>
                <p className="text-xs text-gray-500">Trust Score</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-2xl font-bold text-orange-500">{profile.totalGiven}</p>
                <p className="text-xs text-gray-500">Food Given</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-2xl font-bold text-orange-500">{profile.totalTaken}</p>
                <p className="text-xs text-gray-500">Food Taken</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab('claims')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === 'claims' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border'}`}
          >
            My Claims ({claims.length})
          </button>
          <button
            onClick={() => setTab('listings')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === 'listings' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border'}`}
          >
            My Listings ({myListings.length})
          </button>
        </div>

        {/* Claims Tab */}
        {tab === 'claims' && (
          <div className="flex flex-col gap-3">
            {claims.length === 0 && <p className="text-sm text-gray-400 text-center py-8">You haven't claimed any food yet.</p>}
            {claims.map((claim) => (
              <div key={claim.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{claim.listingTitle}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${claimStatusColor[claim.status]}`}>
                    {claim.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">📍 {claim.listingAreaName}</p>
                {claim.status === 'APPROVED' && (
                  <p className="text-sm text-green-600 mt-1">🏠 {claim.exactAddress}</p>
                )}
                {claim.status === 'APPROVED' && (
                  <button
                    onClick={() => handleMarkPickedUp(claim.id)}
                    className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-xl transition"
                  >
                    Mark as Picked Up
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* My Listings Tab */}
        {tab === 'listings' && (
          <div className="flex flex-col gap-3">
            {myListings.length === 0 && <p className="text-sm text-gray-400 text-center py-8">You haven't shared any food yet.</p>}
            {myListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{listing.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    listing.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                    listing.status === 'CLAIMED' ? 'bg-yellow-100 text-yellow-700' :
                    listing.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {listing.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">🍽️ {listing.servings} servings · 📍 {listing.areaName}</p>

                {/* Show pending claims for this listing */}
                {listing.status === 'AVAILABLE' && claims
                  .filter(c => c.listingId === listing.id && c.status === 'PENDING')
                  .map(c => (
                    <div key={c.id} className="mt-3 bg-orange-50 rounded-xl p-3">
                      <p className="text-sm font-medium text-gray-700">🙋 {c.claimedByName} wants this food</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleApproveClaim(c.id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-1.5 rounded-lg transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectClaim(c.id)}
                          className="flex-1 bg-red-400 hover:bg-red-500 text-white text-xs font-semibold py-1.5 rounded-lg transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
