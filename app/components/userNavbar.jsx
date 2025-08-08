import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '../utils/api'
import { clearTokens, getRefreshToken } from '../../lib/auth'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { Bell, User, Search, LogOut, ChevronDown, Settings, X } from 'lucide-react'

function userNavbar() {
  const router = useRouter()
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false)
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsWithdrawModalOpen(false)
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

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
  return (
    <nav className="bg-gray-800 shadow-sm border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Welcome */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-gray-400">Xush kelibsiz, John!</p>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Turnir yoki o'yin qidiring..."
              className="w-full pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative">
            <Bell size={22} className="text-gray-300" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Image 
              src="/logo/bitcoin.png" 
              alt="Bitcoin" 
              width={20} 
              height={20} 
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-300 hidden md:block">Pul yechish</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-600">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-white">John Doe</span>
                <span className="text-xs text-gray-400">Pro Gamer</span>
              </div>
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all relative"
              >
                <User size={20} />
                <ChevronDown size={14} className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-0.5" />
              </button>
            </div>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-600 z-50">
                <div className="py-1">
                  <button 
                    onClick={() => {
                      setIsProfileDropdownOpen(false)
                      // Add profile navigation here if needed
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <User size={16} />
                    <span>Profil</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsProfileDropdownOpen(false)
                      // Add settings navigation here if needed
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <Settings size={16} />
                    <span>Sozlamalar</span>
                  </button>
                  <hr className="border-gray-600 my-1" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Chiqish</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsWithdrawModalOpen(false)}
        >
          <div 
            className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Pul yechish</h3>
              <button 
                onClick={() => setIsWithdrawModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center space-x-4 p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <Image 
                  src="/logo/bitcoin.png" 
                  alt="Bitcoin" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
                <div className="text-left">
                  <p className="text-white font-medium">Bitcoin</p>
                  <p className="text-gray-400 text-sm">BTC orqali yechish</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <Image 
                  src="/logo/toncoin.png" 
                  alt="Toncoin" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
                <div className="text-left">
                  <p className="text-white font-medium">Toncoin</p>
                  <p className="text-gray-400 text-sm">TON orqali yechish</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <Image 
                  src="/logo/uzcard.png" 
                  alt="UzCard" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
                <div className="text-left">
                  <p className="text-white font-medium">UzCard</p>
                  <p className="text-gray-400 text-sm">UzCard orqali yechish</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <Image 
                  src="/logo/humo.png" 
                  alt="Humo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
                <div className="text-left">
                  <p className="text-white font-medium">Humo</p>
                  <p className="text-gray-400 text-sm">Humo orqali yechish</p>
                </div>
              </button>
            </div>

            <button 
              onClick={() => setIsWithdrawModalOpen(false)}
              className="w-full mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default userNavbar