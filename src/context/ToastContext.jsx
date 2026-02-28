import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = {
    success: (message) => addToast({ message, type: 'success' }),
    error: (message) => addToast({ message, type: 'error' }),
    info: (message) => addToast({ message, type: 'info' }),
    warning: (message) => addToast({ message, type: 'warning' }),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[90vw] max-w-sm pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg text-sm font-medium animate-slide-down
              ${t.type === 'success' ? 'bg-green-500 text-white' : ''}
              ${t.type === 'error'   ? 'bg-red-500 text-white' : ''}
              ${t.type === 'info'    ? 'bg-gray-800 text-white' : ''}
              ${t.type === 'warning' ? 'bg-orange-500 text-white' : ''}
            `}
          >
            <span className="text-base leading-none mt-0.5">
              {t.type === 'success' && '✅'}
              {t.type === 'error'   && '❌'}
              {t.type === 'info'    && 'ℹ️'}
              {t.type === 'warning' && '⚠️'}
            </span>
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              className="opacity-70 hover:opacity-100 text-lg leading-none"
            >×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)