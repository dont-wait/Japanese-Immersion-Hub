import { useState } from 'react';

/**
 * Component Cloze Input — điền từ vào chỗ trống
 */
export default function ClozeInput({ sentence, answer, onSubmit }) {
    const [userInput, setUserInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const isCorrect = userInput.trim() === answer;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (onSubmit) onSubmit(isCorrect);
    };

    // Tách câu thành parts: trước blank, blank, sau blank
    const parts = sentence.split('{{cloze}}');

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="text-xl font-jp text-center leading-10">
                {parts[0]}
                <span className="inline-block mx-1">
                    {submitted ? (
                        <span className={`px-2 py-1 rounded-lg font-bold ${isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {isCorrect ? userInput : `${userInput} → ${answer}`}
                        </span>
                    ) : (
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                            className="w-32 border-b-2 border-dashed border-[#8B5CF6] bg-transparent text-center font-jp text-xl focus:outline-none focus:border-solid transition-all"
                            placeholder="___"
                            autoFocus
                        />
                    )}
                </span>
                {parts[1]}
            </div>

            {!submitted && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] text-white font-medium hover:bg-[#7C3AED] transition-colors"
                    >
                        Check
                    </button>
                </div>
            )}
        </div>
    );
}
