import { useState } from 'react'

/**
 * WYSIWYG-like editor cho nội dung từ vựng (đơn giản)
 */
export default function WysiwygEditor({ value = '', onChange, placeholder = 'Nhập nội dung...' }) {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#262640] text-base font-jp resize-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6] transition-all"
      />
      <p className="text-xs text-gray-400 mt-1">
        Tip: Use 漢字[ふりがな] syntax for furigana annotation
      </p>
    </div>
  )
}
