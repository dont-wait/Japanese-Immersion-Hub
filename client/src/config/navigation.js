// ===== Navigation Configuration =====
import {
  Home,
  BookOpen,
  Search,
  Trophy,
  User,
  Settings,
  Shield,
  PenTool,
  BarChart3,
  Users,
  FileText,
} from 'lucide-react'

export const LEARNER_NAV = [
  { label: 'Dashboard', path: '/learn', icon: Home },
  { label: 'Study', path: '/learn/study', icon: BookOpen },
  { label: 'Dictionary', path: '/learn/dictionary', icon: Search },
  { label: 'Leaderboard', path: '/learn/leaderboard', icon: Trophy },
  { label: 'Profile', path: '/learn/profile', icon: User },
]

export const ADMIN_NAV = [
  { label: 'Dashboard', path: '/admin', icon: BarChart3 },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Content', path: '/admin/content', icon: FileText },
  { label: 'Audit Logs', path: '/admin/logs', icon: Shield },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
]

export const CREATOR_NAV = [
  { label: 'Editor', path: '/creator', icon: PenTool },
  { label: 'My Contributions', path: '/creator/contributions', icon: FileText },
  { label: 'Stats', path: '/creator/stats', icon: BarChart3 },
]
