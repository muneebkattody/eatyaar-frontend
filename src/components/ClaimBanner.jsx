import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../context/NotificationContext'

export default function ClaimBanner() {
  const { newClaimBanner, setNewClaimBanner } = useNotifications()
  const navigate = useNavigate()

  if (!newClaimBanner) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm animate-slide-up">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl px-4 py-4 flex gap-3 items-start">
        <span className="text-2xl">🙋</span>
        <div className="flex-1">
          <p className="text-sm font-semibold">New Claim Request!</p>
          <p className="text-xs text-gray-300 mt-0.5">
            <span className="text-orange-400 font-medium">{newClaimBanner.claimedByName}</span> wants your <span className="text-orange-400 font-medium">{newClaimBanner.listingTitle}</span>
          </p>
          <button
            onClick={() => {
              setNewClaimBanner(null)
              navigate('/claims/inbox')
            }}
            className="mt-2 text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full transition font-semibold"
          >
            View & Approve →
          </button>
        </div>
        <button
          onClick={() => setNewClaimBanner(null)}
          className="text-gray-400 hover:text-white text-lg leading-none"
        >×</button>
      </div>
    </div>
  )
}