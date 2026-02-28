import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function MyClaimsPage() {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetchClaims()
  }, [])

  const fetchClaims = async () => {
    try {
      const res = await api.get('/claims/my')
      setClaims(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkPickedUp = async (claimId) => {
    try {
      await api.patch(`/claims/${claimId}/picked-up`)
      setClaims(claims.map(c =>
        c.id === claimId ? { ...c, status: 'PICKED_UP' } : c
      ))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update')
    }
  }

  const handleRate = async (claimId, score) => {
    try {
      await api.post('/ratings', { claimId, score })
      alert('Thanks for rating!')
    } catch (err) {
      alert(err.response?.data?.message || 'Already rated or failed')
    }
  }

  const filters = ['ALL', 'PENDING', 'APPROVED', 'PICKED_UP', 'REJECTED']

  const filtered = filter === 'ALL'
    ? claims
    : claims.filter(c => c.status === filter)

  const statusStyle = {
    PENDING:   { bg: 'bg-yellow-100 text-yellow-700', label: '⏳ Waiting for approval' },
    APPROVED:  { bg: 'bg-green-100 text-green-700',   label: '✅ Approved! Go pick it up' },
    REJECTED:  { bg: 'bg-red-100 text-red-500',       label: '❌ Rejected' },
    PICKED_UP: { bg: 'bg-blue-100 text-blue-700',     label: '🎉 Picked up' },
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Claims</h2>
          <p className="text-sm text-gray-500 mt-1">Food you've requested from others.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                filter === f
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {f === 'ALL' ? `All (${claims.length})` : f}
            </button>
          ))}
        </div>

        {/* Claims list */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🙋</p>
            <p className="text-sm">No claims here yet.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {filtered.map(claim => (
            <div key={claim.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">

              {/* Listing info */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{claim.listingTitle}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">📍 {claim.listingAreaName}</p>
                  <p className="text-xs text-gray-400">
                    Claimed on {new Date(claim.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[claim.status]?.bg}`}>
                  {claim.status}
                </span>
              </div>

              {/* Status message */}
              <p className="text-sm text-gray-500 mb-3">
                {statusStyle[claim.status]?.label}
              </p>

              {/* Address — only shown when approved */}
              {(claim.status === 'APPROVED' || claim.status === 'PICKED_UP') && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-3">
                  <p className="text-xs text-green-600 font-medium mb-1">📍 Pickup Address</p>
                  <p className="text-sm text-gray-700">{claim.exactAddress}</p>
                </div>
              )}

              {/* Mark as picked up button */}
              {claim.status === 'APPROVED' && (
                <button
                  onClick={() => handleMarkPickedUp(claim.id)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl text-sm transition mb-2"
                >
                  I've Picked It Up ✅
                </button>
              )}

              {/* Rate the giver */}
              {claim.status === 'PICKED_UP' && (
                <div>
                  <p className="text-xs text-gray-500 mb-2 text-center">Rate the giver</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleRate(claim.id, star)}
                        className="text-2xl hover:scale-110 transition"
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}