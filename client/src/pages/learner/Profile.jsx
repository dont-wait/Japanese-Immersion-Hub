import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import authService from '../../services/authService'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import {
  Key,
  User,
  Mail,
  Shield,
  AlertCircle,
  ChevronRight,
  Camera,
  Settings,
  Bell,
  Lock,
} from 'lucide-react'

export default function Profile() {
  const { user, fetchCurrentUser } = useAuth()
  const { success, error: toastError } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreatePassword = async (e) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      toastError('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }

    setLoading(true)
    try {
      await authService.createPassword(newPassword)
      success('Tạo mật khẩu thành công!')
      setIsModalOpen(false)
      setNewPassword('')
      await fetchCurrentUser()
    } catch (err) {
      toastError(err.message || 'Có lỗi xảy ra khi tạo mật khẩu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper/30 pb-20 animate-fade-in-up">
      {/* Elegant Header */}
      <div className="bg-white border-b border-zinc-100 mb-8">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-fuji font-bold text-sm mb-2 tracking-widest uppercase">
                <Settings size={14} /> Account Settings
              </div>
              <h1 className="text-5xl font-black font-headline tracking-tighter text-ink mb-3">
                Hồ sơ của bạn.
              </h1>
              <p className="text-zinc-500 font-medium max-w-md">
                Quản lý thông tin định danh và các thiết lập bảo mật cấp cao cho tài khoản Minori
                của bạn.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="rounded-2xl h-12 px-6 font-bold border-zinc-100 text-zinc-600 bg-white shadow-sm"
              >
                <Bell size={18} className="mr-2" /> Thông báo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-zinc-100 flex flex-col items-center relative overflow-hidden group">
            <div className="w-32 h-32 rounded-[2rem] bg-paper relative mb-6 p-1 shadow-inner border border-zinc-50">
              <div className="w-full h-full rounded-[1.8rem] bg-fuji/5 flex items-center justify-center text-fuji text-5xl font-black overflow-hidden border-2 border-white">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.username}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                ) : (
                  <span className="font-headline">{user?.username?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-fuji text-white rounded-2xl shadow-lg shadow-fuji/20 hover:scale-110 transition-transform duration-300 border-4 border-white">
                <Camera size={16} />
              </button>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black font-headline text-ink">
                {user?.displayName || user?.username}
              </h2>
              <p className="text-sm font-bold text-fuji uppercase tracking-widest">{user?.role}</p>
            </div>

            <div className="w-full mt-10 space-y-3">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-paper/50 border border-zinc-50">
                <div className="p-2.5 bg-white rounded-xl text-zinc-400 shadow-sm border border-zinc-50">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-0.5">
                    Email Address
                  </p>
                  <p className="text-sm font-bold text-ink truncate">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-paper/50 border border-zinc-50">
                <div className="p-2.5 bg-white rounded-xl text-zinc-400 shadow-sm border border-zinc-50">
                  <User size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-0.5">
                    Username
                  </p>
                  <p className="text-sm font-bold text-ink truncate">@{user?.username}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 w-full border-t border-zinc-100">
              <div className="bg-fuji/5 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs font-bold text-fuji/70 uppercase">Trạng thái bảo mật</span>
                <span className="px-3 py-1 bg-white text-fuji text-[10px] font-black rounded-full shadow-sm border border-fuji/10">
                  {user?.hasPassword ? 'ĐÃ BẢO MẬT' : 'CHƯA HOÀN TẤT'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Settings Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Security & Password Section */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-zinc-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black font-headline text-ink flex items-center gap-3">
                <Lock className="text-fuji" size={24} /> Quyền riêng tư & Bảo mật
              </h3>
            </div>

            {!user?.hasPassword ? (
              <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 border border-amber-200/40 rounded-[2rem] p-8 mb-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-amber-200/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                    <AlertCircle size={32} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-black text-amber-900 mb-2 tracking-tight">
                      Thiết lập mật khẩu Minori
                    </h4>
                    <p className="text-sm text-amber-800/60 font-medium leading-relaxed mb-6">
                      Bạn đang đăng nhập qua Google. Hãy tạo mật khẩu riêng để có thể đăng nhập linh
                      hoạt hơn trên mọi thiết bị mà không cần phụ thuộc vào bên thứ ba.
                    </p>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl h-12 px-6 font-bold shadow-lg shadow-amber-600/20 border-none transition-all active:scale-95"
                    >
                      Thiết lập mật khẩu ngay
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50/50 border border-green-100 rounded-[2rem] p-8 mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm border border-green-100">
                    <Shield size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-green-900 mb-1 tracking-tight">
                      Mật khẩu đã được thiết lập
                    </h4>
                    <p className="text-sm text-green-800/60 font-medium">
                      Bạn đã có thể đăng nhập bằng cả Email/Mật khẩu hoặc Google. Tài khoản của bạn
                      đang được bảo mật tốt.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-[1.5rem] border border-zinc-100 bg-paper/20 flex justify-between items-center hover:border-fuji/30 hover:bg-fuji/[0.02] transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-zinc-400 group-hover:text-fuji shadow-sm border border-zinc-50 transition-colors">
                    <Key size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-ink text-sm">Đổi mật khẩu</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Cập nhật định kỳ
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-zinc-300 group-hover:text-fuji transition-transform group-hover:translate-x-1"
                />
              </div>

              <div className="p-6 rounded-[1.5rem] border border-zinc-100 bg-paper/20 flex justify-between items-center hover:border-fuji/30 hover:bg-fuji/[0.02] transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-zinc-400 group-hover:text-fuji shadow-sm border border-zinc-50 transition-colors">
                    <Settings size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-ink text-sm">Quản lý phiên</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Các thiết bị đang dùng
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-zinc-300 group-hover:text-fuji transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Create Password Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Bảo mật tài khoản"
        size="md"
        theme="light"
      >
        <div className="py-4">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex p-5 bg-fuji/5 text-fuji rounded-[2.5rem] mb-2 animate-pulse-glow border border-fuji/10">
              <Lock size={36} />
            </div>
            <h4 className="text-3xl font-black font-headline text-ink tracking-tight">
              Tạo mật khẩu.
            </h4>
            <p className="text-zinc-500 font-medium max-w-[320px] mx-auto leading-relaxed">
              Mật khẩu này sẽ giúp bạn đăng nhập độc lập vào hệ thống Minori.
            </p>
          </div>

          <form onSubmit={handleCreatePassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-ink uppercase tracking-widest ml-1">
                Mật khẩu mới
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-fuji transition-colors">
                  <Key size={18} />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-paper/50 border-2 border-transparent focus:border-fuji/20 focus:bg-white focus:ring-4 focus:ring-fuji/5 outline-none transition-all placeholder:text-zinc-400 font-medium text-ink"
                  placeholder="Tối thiểu 8 ký tự"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                variant="secondary"
                className="flex-1 h-14 rounded-2xl font-black text-zinc-500 border-none bg-paper/50"
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                className="flex-1 h-14 rounded-2xl font-black shadow-xl shadow-fuji/20 bg-fuji hover:bg-fuji-dark transition-all hover:-translate-y-0.5 active:translate-y-0"
                type="submit"
                loading={loading}
              >
                Xác nhận tạo
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
