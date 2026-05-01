import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

/**
 * Component cho phép thêm nhiều nghĩa / ví dụ cho 1 từ
 */
export default function MeaningRepeater({ meanings = [], onChange }) {
    const addMeaning = () => {
        onChange([...meanings, { text: '', partOfSpeech: '' }]);
    };

    const updateMeaning = (index, field, value) => {
        const updated = meanings.map((m, i) =>
            i === index ? { ...m, [field]: value } : m
        );
        onChange(updated);
    };

    const removeMeaning = (index) => {
        onChange(meanings.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-3">
            {meanings.map((meaning, index) => (
                <div key={index} className="flex items-start gap-2">
                    <input
                        type="text"
                        value={meaning.partOfSpeech}
                        onChange={(e) => updateMeaning(index, 'partOfSpeech', e.target.value)}
                        placeholder="Noun, Verb..."
                        className="w-28 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#262640] text-sm focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                    <input
                        type="text"
                        value={meaning.text}
                        onChange={(e) => updateMeaning(index, 'text', e.target.value)}
                        placeholder="Meaning / Definition"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#262640] text-sm focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                    />
                    <button
                        onClick={() => removeMeaning(index)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
            <button
                onClick={addMeaning}
                className="flex items-center gap-2 text-sm text-[#8B5CF6] font-medium hover:underline"
            >
                <Plus size={14} />
                Add Meaning
            </button>
        </div>
    );
}
