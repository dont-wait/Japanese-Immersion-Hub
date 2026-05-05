import { Outlet, NavLink } from 'react-router-dom'
import { ADMIN_NAV } from '../../config/navigation'
import Header from '../common/Header'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)] dark:bg-[var(--color-paper-dark)]">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#1A1A2E]/50 backdrop-blur-sm p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 px-3">
            Admin Panel
          </h2>
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
