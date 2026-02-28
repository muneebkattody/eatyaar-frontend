import { useState, useEffect } from 'react'
import api from '../api/axios'
import FoodCard from '../components/FoodCard'
import { useAuth } from '../context/AuthContext'

const PAGE_SIZE = 6

export default function HomePage() {
  const { isLoggedIn } = useAuth()
  const [allListings, setAllListings] = useState([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [stats, setStats] = useState(null)
  const [city, setCity] = useState('')
  const [searchCity, setSearchCity] = useState('')

  useEffect(() => {
    fetchAll()
    fetchStats()
  }, [])

  const fetchAll = async (cityFilter = '') => {
    setLoading(true)
    try {
      const url = cityFilter ? `/listings?city=${cityFilter}` : '/listings/all'
      const res = await api.get(url)
      setAllListings(res.data)
      setVisibleCount(PAGE_SIZE)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await api.get('/stats/global')
      setStats(res.data)
    } catch {
      // silent
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmed = city.trim()
    setSearchCity(trimmed)
    fetchAll(trimmed)
  }

  const handleClearSearch = () => {
    setCity('')
    setSearchCity('')
    fetchAll()
  }

  const handleLoadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount(v => v + PAGE_SIZE)
      setLoadingMore(false)
    }, 400)
  }

  const visibleListings = allListings.slice(0, visibleCount)
  const hasMore = visibleCount < allListings.length

  return (
    <div className="min-h-screen" style={{ background: '#FFF8F0' }}>

      {/* Hero */}
      <div className="bg-orange-500 text-white px-4 pt-10 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute top-4 right-8 text-7xl rotate-12">🍱</div>
          <div className="absolute bottom-2 left-4 text-5xl -rotate-6">🥘</div>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <h1 className="font-display font-800 text-3xl md:text-4xl leading-tight mb-2">
            Good food nearby.<br />Don't let it go to waste.
          </h1>
          <p className="text-orange-100 text-sm mb-6 max-w-xs">
            Wedding leftovers, home cooking, event food — claim it before it's gone.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Filter by city..."
                className="w-full px-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm pr-10"
              />
              {city && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                >×</button>
              )}
            </div>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 active:scale-95 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-150 shadow-sm whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Impact stats bar */}
      {stats && (
        <div className="bg-gray-900 text-white py-3 px-4">
          <div className="max-w-2xl mx-auto flex justify-around text-center">
            <div>
              <p className="font-display font-700 text-orange-400 text-lg">{stats.totalListings || 0}</p>
              <p className="text-xs text-gray-400">Meals Shared</p>
            </div>
            <div className="w-px bg-gray-700" />
            <div>
              <p className="font-display font-700 text-orange-400 text-lg">{stats.totalPickedUp || 0}</p>
              <p className="text-xs text-gray-400">Meals Saved</p>
            </div>
            <div className="w-px bg-gray-700" />
            <div>
              <p className="font-display font-700 text-orange-400 text-lg">{stats.totalUsers || 0}</p>
              <p className="text-xs text-gray-400">Yaars</p>
            </div>
          </div>
        </div>
      )}

      {/* Listings */}
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Active filter badge */}
        {searchCity && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Showing results for</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              📍 {searchCity}
              <button onClick={handleClearSearch} className="ml-1 hover:text-orange-800">×</button>
            </span>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Finding food near you...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && allListings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">{searchCity ? '🕳️' : '🍽️'}</p>
            <p className="font-display font-600 text-gray-700 text-lg">
              {searchCity ? `Nothing in ${searchCity} yet` : 'No food listed yet'}
            </p>
            <p className="text-sm text-gray-400 mt-1">Be the first to share food here!</p>
            {isLoggedIn && (
              <a href="/post" className="inline-block mt-4 bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-600 transition">
                + Share Food
              </a>
            )}
          </div>
        )}

        {/* Listings grid */}
        {!loading && allListings.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Showing <span className="font-semibold text-gray-800">{visibleListings.length}</span> of <span className="font-semibold text-gray-800">{allListings.length}</span> meals available
              {searchCity && <> in <span className="font-semibold text-orange-500">{searchCity}</span></>}
            </p>

            <div className="flex flex-col gap-3">
              {visibleListings.map((listing) => (
                <FoodCard
                  key={listing.id}
                  listing={listing}
                  onClaimed={() => fetchAll(searchCity)}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2 bg-white border border-orange-200 hover:border-orange-400 text-orange-500 font-semibold px-8 py-3 rounded-full text-sm transition-all duration-150 active:scale-95 disabled:opacity-50 shadow-sm"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-4 h-4 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                        +{Math.min(PAGE_SIZE, allListings.length - visibleCount)}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* All loaded message */}
            {!hasMore && allListings.length > PAGE_SIZE && (
              <p className="text-center text-xs text-gray-400 mt-8">
                🎉 You've seen all {allListings.length} listings
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}