import { useState } from 'react'
import { Upload, X, Image } from 'lucide-react'

/**
 * Component upload hình ảnh (VD: mnemonics, context images)
 */
export default function ImageUploader({ onUpload, currentImage = null }) {
  const [preview, setPreview] = useState(currentImage)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    if (onUpload) onUpload(file)
  }

  const handleRemove = () => {
    setPreview(null)
    if (onUpload) onUpload(null)
  }

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-[#8B5CF6] transition-colors cursor-pointer">
          <Image size={32} className="text-gray-400 mb-2" />
          <span className="text-sm text-gray-400">Click to upload image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      )}
    </div>
  )
}
