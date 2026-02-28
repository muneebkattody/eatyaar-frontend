import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function ClaimsInboxPage() {
  const [myListings, setMyListings] = useState([])
  const [claimsMap, setClaimsMap] = useState({}) // listingId → claims[]
  const [loading, setLoading] = useState(true)
  const [activeListingId, setActiveListingId] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const listingsRes = await api.get('/listings/my')
      const listings = listingsRes.data
      setMyListings(listings)

      // Fetch claims for each listing
      const claimsRes = await api.get('/claims/received')
      const claims = claimsRes.data

      // Group claims by listing id
      const grouped = {}
      claims.forEach(claim => {
        if (!grouped[claim.listingId]) grouped[claim.listingId] = []
        grouped[claim.listingId].push(claim)
      })
      setClaimsMap(grouped)

      // Auto open first listing that has pending claims
      const firstWithPending = listings.find(l =>
        (grouped[l.id] || []).some(c => c.status === 'PENDING')
      )
      if (firstWithPending) setActiveListingId(firstWithPending.id)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (claimId, listingId) => {
    try {
      await api.patch(`/claims/${claimId}/approve`)
      updateClaimStatus(claimId, listingId, 'APPROVED')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve')
    }
  }

  const handleReject = async (claimId, listingId) => {
    try {
      await api.patch(`/claims/${claimId}/reject`)
      updateClaimStatus(claimId, listingId, 'REJECTED')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject')
    }
  }

  const updateClaimStatus = (claimId, listingId, newStatus) => {
    setClaimsMap(prev => ({
      ...prev,
      [listingId]: prev[listingId].map(c =>
        c.id === claimId ? { ...c, status: newStatus } : c
      )
    }))
  }

  const statusStyle = {
    PENDING:  'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-500',
    PICKED_UP: 'bg-blue-100 text-blue-700',
  }

  const totalPending = Object.values(claimsMap)
    .flat()
    .filter(c => c.status === 'PENDING').length

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Claims Inbox</h2>
          <p className="text-sm text-gray-500 mt-1">
            People who want your food.
            {totalPending > 0 && (
              <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalPending} pending
              </span>
            )}
          </p>
        </div>

        {myListings.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🍱</p>
            <p className="text-sm">You haven't shared any food yet.</p>
          </div>
        )}

        {/* Listings with claims */}
        <div className="flex flex-col gap-4">
          {myListings.map(listing => {
            const claims = claimsMap[listing.id] || []
            const pendingCount = claims.filter(c => c.status === 'PENDING').length
            const isOpen = activeListingId === listing.id

            return (
              <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Listing Header — clickable to expand */}
                <button
                  onClick={() => setActiveListingId(isOpen ? null : listing.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{listing.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      📍 {listing.areaName} · 🍽️ {listing.servings} servings
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {pendingCount > 0 && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {pendingCount} new
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      listing.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                      listing.status === 'CLAIMED' ? 'bg-yellow-100 text-yellow-700' :
                      listing.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {listing.status}
                    </span>
                    <span className="text-gray-400 text-sm">{isOpen ? '▲' : '▼'}</span>
                  </div>
                </button>

                {/* Claims List — expandable */}
                {isOpen && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {claims.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-6">
                        No one has claimed this yet.
                      </p>
                    )}

                    {claims.map(claim => (
                      <div key={claim.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">
                              🧑
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{claim.claimedByName}</p>
                              <p className="text-xs text-gray-400">
                                {new Date(claim.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[claim.status]}`}>
                            {claim.status}
                          </span>
                        </div>

                        {/* Action buttons for pending claims */}
                        {claim.status === 'PENDING' && (
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleApprove(claim.id, listing.id)}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-xl transition"
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() => handleReject(claim.id, listing.id)}
                              className="flex-1 bg-red-400 hover:bg-red-500 text-white text-sm font-semibold py-2 rounded-xl transition"
                            >
                              ❌ Reject
                            </button>
                          </div>
                        )}

                        {claim.status === 'APPROVED' && (
                          <p className="text-xs text-green-600 mt-2">
                            ✅ Approved — address has been shared with them
                          </p>
                        )}

                        {claim.status === 'PICKED_UP' && (
                          <p className="text-xs text-blue-600 mt-2">
                            🎉 Food picked up successfully!
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}