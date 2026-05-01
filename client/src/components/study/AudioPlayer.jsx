import { Volume2, Pause } from 'lucide-react';
import useAudio from '../../hooks/useAudio';

/**
 * Component Audio Player cho phát âm
 */
export default function AudioPlayer({ src, label = 'Listen' }) {
    const { isPlaying, toggle } = useAudio(src);

    if (!src) return null;

    return (
        <button
            onClick={toggle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0EA5E9]/10 text-[#0EA5E9] hover:bg-[#0EA5E9]/20 transition-colors text-sm font-medium"
        >
            {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
            {label}
        </button>
    );
}
