export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#1A1A2E]/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">🏯</span>
                            <span className="text-lg font-bold bg-gradient-to-r from-[#8B5CF6] to-[#DB2777] bg-clip-text text-transparent">
                                J-Hub
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Japanese Immersion Hub — Học tiếng Nhật qua trải nghiệm thực tế với Spaced Repetition.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#features" className="hover:text-[#8B5CF6] transition-colors">Features</a></li>
                            <li><a href="#about" className="hover:text-[#8B5CF6] transition-colors">About</a></li>
                            <li><a href="#contact" className="hover:text-[#8B5CF6] transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                            Community
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">Discord</a></li>
                            <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">GitHub</a></li>
                            <li><a href="#" className="hover:text-[#8B5CF6] transition-colors">Twitter / X</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Japanese Immersion Hub. Built with 🍣 & ❤️
                </div>
            </div>
        </footer>
    );
}
