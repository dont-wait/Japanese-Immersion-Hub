import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

const TOAST_TYPES = {
  success: { icon: CheckCircle, bg: 'bg-green-500', text: 'text-white' },
  error: { icon: XCircle, bg: 'bg-red-500', text: 'text-white' },
  warning: { icon: AlertTriangle, bg: 'bg-yellow-500', text: 'text-white' },
  info: { icon: Info, bg: 'bg-blue-500', text: 'text-white' },
}

export default function ToastNotification({ message, type = 'info', duration = 4000, onClose }) {
  const [visible, setVisible] = useState(true)
  const config = TOAST_TYPES[type]
  const Icon = config.icon

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // Wait for exit animation
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`fixed top-20 right-4 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${config.bg} ${config.text} transition-all duration-300 ${
        visible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-2'
      }`}
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setVisible(false)
          onClose()
        }}
        className="ml-2 p-0.5 rounded-full hover:bg-white/20"
      >
        <X size={14} />
      </button>
    </div>
  )
}
