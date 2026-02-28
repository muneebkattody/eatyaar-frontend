import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function PostFoodPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    description: '',
    servings: '',
    foodType: 'VEG',
    cookedAt: '',
    pickupBy: '',
    areaName: '',
    exactAddress: '',
    city: '',
    state: '',
    pincode: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/listings', {
        ...form,
        servings: parseInt(form.servings),
      })
      alert('Food listed successfully!')
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post listing')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
  const labelClass = "text-sm font-medium text-gray-700 mb-1 block"

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Share Your Food</h2>
        <p className="text-sm text-gray-400 mb-6">Let someone else enjoy it instead of wasting it.</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Food Title *</label>
            <input name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Homemade Dal & Rice" className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              placeholder="Brief description of the food" rows={3}
              className={inputClass + ' resize-none'} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Food Type *</label>
              <select name="foodType" value={form.foodType} onChange={handleChange} className={inputClass}>
                <option value="VEG">Vegetarian</option>
                <option value="NON_VEG">Non-Vegetarian</option>
                <option value="BOTH">Both</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Number of Servings *</label>
              <input name="servings" type="number" min="1" value={form.servings} onChange={handleChange}
                placeholder="e.g. 5" className={inputClass} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Cooked At *</label>
              <input name="cookedAt" type="datetime-local" value={form.cookedAt} onChange={handleChange}
                className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Pickup By *</label>
              <input name="pickupBy" type="datetime-local" value={form.pickupBy} onChange={handleChange}
                className={inputClass} required />
            </div>
          </div>

          <div>
            <label className={labelClass}>Area Name * (shown publicly)</label>
            <input name="areaName" value={form.areaName} onChange={handleChange}
              placeholder="e.g. Koregaon Park" className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>Exact Pickup Address * (shown only after approval)</label>
            <textarea name="exactAddress" value={form.exactAddress} onChange={handleChange}
              placeholder="Flat 4B, Sunrise Apartments, Lane 5" rows={2}
              className={inputClass + ' resize-none'} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>City *</label>
              <input name="city" value={form.city} onChange={handleChange}
                placeholder="Pune" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>State *</label>
              <input name="state" value={form.state} onChange={handleChange}
                placeholder="Maharashtra" className={inputClass} required />
            </div>
          </div>

          <div>
            <label className={labelClass}>Pincode *</label>
            <input name="pincode" value={form.pincode} onChange={handleChange}
              placeholder="411001" maxLength={6} className={inputClass} required />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'List Food for Free'}
          </button>
        </form>
      </div>
    </div>
  )
}
