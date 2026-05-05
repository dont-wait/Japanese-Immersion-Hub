import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children, size = 'md', theme = 'auto' }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  }

  const isLight = theme === 'light'
  const bgClass = isLight ? 'bg-white' : 'bg-white dark:bg-[#262640]'
  const borderClass = isLight ? 'border-gray-100' : 'border-gray-200 dark:border-gray-700'
  const textClass = isLight ? 'text-ink' : 'text-ink dark:text-white'

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${isLight ? 'light' : ''}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative w-full ${sizeClasses[size]} ${bgClass} rounded-[2.5rem] shadow-2xl animate-fade-in-up overflow-hidden`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-8 py-6 border-b ${borderClass}`}>
          <h3 className={`text-xl font-black font-headline ${textClass}`}>{title}</h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-2xl hover:bg-gray-100 ${isLight ? '' : 'dark:hover:bg-gray-700'} transition-colors`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 max-h-[85vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
