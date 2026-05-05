import { Link } from 'react-router-dom'

/**
 * Component danh sách từ vựng liên quan
 */
export default function RelatedVocabsList({ vocabs = [] }) {
  if (vocabs.length === 0) return null

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
        Related Vocabulary
      </h3>
      <div className="space-y-2">
        {vocabs.map((vocab) => (
          <Link
            key={vocab.id}
            to={`/learn/dictionary?q=${vocab.word}`}
            className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#262640] border border-gray-200 dark:border-gray-700 hover:border-[#8B5CF6]/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl font-jp font-bold group-hover:text-[#8B5CF6] transition-colors">
                {vocab.word}
              </span>
              <span className="text-sm text-gray-400 font-jp">{vocab.reading}</span>
            </div>
            <span className="text-sm text-gray-500">{vocab.meaning}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
