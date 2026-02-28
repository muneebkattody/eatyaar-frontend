import { useState, useEffect } from 'react'
import api from '../api/axios'
import FoodCard from '../components/FoodCard'

export default function HomePage() {
  const [listings, setListings] = useState([])
  const [city, setCity] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchListings = async (cityName) => {
    if (!cityName) return
    setLoading(true)
    setError('')
    try {
      const res = await api.get(`/listings?city=${cityName}`)
      setListings(res.data)
    } catch (err) {
      setError('Could not load listings. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchCity(city)
    fetchListings(city)
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero */}
      <div className="bg-orange-500 text-white text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-2">Food near you. Free.</h2>
        <p className="text-orange-100 mb-6 text-sm">Wedding leftovers, home cooking, event food — claim before it's gone.</p>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city..."
            className="flex-1 px-4 py-2 rounded-xl text-gray-800 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-orange-100 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Listings */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {!searchCity && (
          <p className="text-center text-gray-400 text-sm">Enter your city above to see available food near you.</p>
        )}

        {loading && (
          <p className="text-center text-gray-400 text-sm">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}

        {!loading && searchCity && listings.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            No food available in <strong>{searchCity}</strong> right now. Check back soon!
          </p>
        )}

        {listings.length > 0 && (
          <>
            <h3 className="text-gray-600 text-sm mb-4">
              {listings.length} listing{listings.length > 1 ? 's' : ''} available in <strong>{searchCity}</strong>
            </h3>
            <div className="flex flex-col gap-4">
              {listings.map((listing) => (
                <FoodCard
                  key={listing.id}
                  listing={listing}
                  onClaimed={() => fetchListings(searchCity)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
