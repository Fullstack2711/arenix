import React from 'react'
import { Bell, User, Search, Settings } from 'lucide-react'

function userNavbar() {
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
          
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
            <Settings size={22} className="text-gray-300" />
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-gray-600">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-white">John Doe</span>
              <span className="text-xs text-gray-400">Pro Gamer</span>
            </div>
            <button className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default userNavbar