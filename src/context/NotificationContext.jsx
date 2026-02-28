import { createContext, useContext, useState, useEffect, useRef } from 'react'
import api from '../api/axios'
import { useAuth } from './AuthContext'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const { isLoggedIn } = useAuth()
  const [pendingClaimsCount, setPendingClaimsCount] = useState(0)
  const [newClaimBanner, setNewClaimBanner] = useState(null) // { listingTitle, claimedByName }
  const prevCountRef = useRef(0)

  useEffect(() => {
    if (!isLoggedIn) {
      setPendingClaimsCount(0)
      return
    }

    const poll = async () => {
      try {
        const res = await api.get('/claims/received')
        const pending = res.data.filter(c => c.status === 'PENDING')
        const count = pending.length

        // If new claim came in since last poll — show banner
        if (count > prevCountRef.current && prevCountRef.current !== null) {
          const newest = pending[pending.length - 1]
          setNewClaimBanner({
            listingTitle: newest.listingTitle,
            claimedByName: newest.claimedByName,
          })
          setTimeout(() => setNewClaimBanner(null), 6000)
        }

        prevCountRef.current = count
        setPendingClaimsCount(count)
      } catch {
        // silent fail
      }
    }

    poll() // immediate first call
    const interval = setInterval(poll, 30000) // poll every 30 seconds
    return () => clearInterval(interval)
  }, [isLoggedIn])

  return (
    <NotificationContext.Provider value={{ pendingClaimsCount, newClaimBanner, setNewClaimBanner }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)