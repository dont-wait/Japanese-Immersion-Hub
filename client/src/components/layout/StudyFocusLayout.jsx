import { Outlet } from 'react-router-dom';

/**
 * Layout tập trung cho phiên học — ẩn header/footer để tránh phân tâm
 */
export default function StudyFocusLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#262640] to-[#312E81] text-white">
            <div className="w-full max-w-2xl px-4">
                <Outlet />
            </div>
        </div>
    );
}
