import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  Trophy, 
  Gamepad2, 
  User, 
  BarChart3, 
  Settings, 
  LogOut,
  Wallet,
  Sword,
  Target,
  Crown,
  Users,
  History
} from 'lucide-react'
import { logout } from '../utils/api'
import { clearTokens, getRefreshToken } from '../../lib/auth'
import toast from 'react-hot-toast'

function userSidebar({ activeTab, setActiveTab }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const refreshToken = getRefreshToken()
      
      // Call logout API
      await logout(refreshToken)
      
      // Clear local tokens
      clearTokens()
      
      // Show success message
      toast.success('Muvaffaqiyatli chiqildi!')
      
      // Redirect to login page
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if API fails, clear local tokens and redirect
      clearTokens()
      toast.success('Chiqildi!')
      router.push('/login')
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tournaments', label: 'Turnirlar', icon: Trophy },
    { id: 'games', label: 'O\'yinlar', icon: Gamepad2 },
    { id: 'my-games', label: 'Mening o\'yinlarim', icon: Sword },
    { id: 'achievements', label: 'Yutuqlar', icon: Crown },
    { id: 'friends', label: 'Do\'stlar', icon: Users },
    { id: 'wallet', label: 'Hamyon', icon: Wallet },
    { id: 'history', label: 'Tarix', icon: History },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-gray-800 shadow-lg border-r border-gray-700 h-screen flex flex-col overflow-hidden">
      <div className="p-6 flex-1 overflow-y-auto">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <h2 className="text-xl font-bold text-white">Arenix</h2>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab?.(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[0.98]'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Fixed bottom section */}
      <div className="p-6 pt-0 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Chiqish</span>
        </button>
      </div>
    </aside>
  )
}

export default userSidebar