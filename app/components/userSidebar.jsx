import React from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '../utils/api'
import { clearTokens, getRefreshToken } from '../../lib/auth'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { 
  BarChart3, 
  Trophy, 
  Gamepad2, 
  Crown, 
  Users, 
  Wallet, 
  TrendingUp, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react'

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

  const handleNavigation = (id) => {
    if (setActiveTab) {
      // Dashboard mode - use setActiveTab
      setActiveTab(id)
    } else {
      // Separate page mode - navigate to route
      switch (id) {
        case 'dashboard':
          router.push('/user-dashboard')
          break
        case 'tournaments':
          router.push('/tournaments')
          break
        case 'games':
          router.push('/games')
          break
        case 'achievements':
          router.push('/achievements')
          break
        case 'friends':
          router.push('/friends')
          break
        case 'wallet':
          router.push('/wallet')
          break
        case 'history':
          router.push('/history')
          break
        case 'profile':
          router.push('/profile')
          break
        case 'settings':
          router.push('/settings')
          break
        default:
          break
      }
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tournaments', label: 'Qoidalar', icon: Trophy },
    { id: 'games', label: 'O\'yinlar', icon: Gamepad2 },
    { id: 'achievements', label: 'Yutuqlar', icon: Crown },
    { id: 'friends', label: 'Userlar', icon: Users },
    { id: 'wallet', label: 'Hamyon', icon: Wallet },
    // { id: 'history', label: 'Tarix', icon: TrendingUp },
    // { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-gray-800 shadow-lg border-r border-gray-700 h-screen flex flex-col overflow-hidden">
      <div className="p-6 flex-1 overflow-y-auto">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2 mb-8">
          <Image 
            src="/logo/logo-removebg-preview.png" 
            alt="Arenix Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
          <h2 className="text-xl font-bold text-white">Arenix</h2>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[0.98]'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <IconComponent size={20} />
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