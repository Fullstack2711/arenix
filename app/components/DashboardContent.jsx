'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Trophy, 
  Gamepad2, 
  Coins, 
  Users,
  Sword,
  Crown,
  Target,
  Flame,
  ChevronRight,
  Calendar,
  Clock,
  Star,
  ExternalLink
} from 'lucide-react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/api'

function DashboardContent({ activeTab }) {
  const router = useRouter()

  // Alohida sahifalarga yo'naltirish
  const handleNavigation = (path) => {
    router.push(path)
  }

  if (activeTab === 'dashboard') {
    return <DashboardOverview onNavigate={handleNavigation} />
  }
  
  if (activeTab === 'tournaments') {
    return <TournamentsSection onNavigate={handleNavigation} />
  }
  
  if (activeTab === 'games') {
    // Redirect to games page instead of trying to render GamesSection
    router.push('/games')
    return null
  }
  
  if (activeTab === 'my-games') {
    // Redirect to games page instead of trying to render MyGamesSection
    router.push('/games')
    return null
  }
  
  // Boshqa tablar uchun alohida sahifalarga yo'naltirish
  if (activeTab === 'wallet') {
    router.push('/wallet')
    return null
  }
  
  if (activeTab === 'profile') {
    router.push('/profile')
    return null
  }
  
  if (activeTab === 'achievements') {
    router.push('/achievements')
    return null
  }
  
  if (activeTab === 'friends') {
    router.push('/friends')
    return null
  }
  
  if (activeTab === 'history') {
    router.push('/history')
    return null
  }
  
  if (activeTab === 'settings') {
    router.push('/settings')
    return null
  }
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        {getTabTitle(activeTab)}
      </h2>
      <div className="bg-gray-800 rounded-xl p-8 shadow-sm">
        <p className="text-gray-300">Bu bo'lim hozirda ishlab chiqilmoqda...</p>
        <button 
          onClick={() => router.push(`/${activeTab}`)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <ExternalLink size={16} />
          <span>Alohida sahifada ochish</span>
        </button>
      </div>
    </div>
  )
}

function DashboardOverview({ onNavigate }) {
  const stats = [
    {
      title: 'Jami G\'alaba',
      value: '24',
      icon: Trophy,
      color: 'text-yellow-400',
      bg: 'bg-yellow-900/20',
      change: '+12%'
    },
    {
      title: 'Faol Turnirlar',
      value: '3',
      icon: Sword,
      color: 'text-blue-400',
      bg: 'bg-blue-900/20',
      change: '+2'
    },
    {
      title: 'Jami Daromad',
      value: '$1,250',
      icon: Coins,
      color: 'text-green-400',
      bg: 'bg-green-900/20',
      change: '+25%'
    },
    {
      title: 'Reyting',
      value: '1,847',
      icon: Crown,
      color: 'text-purple-400',
      bg: 'bg-purple-900/20',
      change: '+156'
    }
  ]

  const recentMatches = [
    { game: 'CS:GO', opponent: 'Team Alpha', result: 'Win', score: '16-14', time: '2 soat oldin' },
    { game: 'Dota 2', opponent: 'Pro Gamers', result: 'Win', score: '2-1', time: '5 soat oldin' },
    { game: 'PUBG', opponent: 'Squad X', result: 'Loss', score: '#3', time: '1 kun oldin' },
    { game: 'FIFA 24', opponent: 'FC Masters', result: 'Win', score: '3-1', time: '2 kun oldin' },
  ]

  const upcomingTournaments = [
    { name: 'CS:GO Championship', prize: '$5,000', date: '15 Avg', participants: '64 jamoa' },
    { name: 'Dota 2 Pro League', prize: '$3,000', date: '20 Avg', participants: '32 jamoa' },
    { name: 'PUBG Battle Royal', prize: '$2,000', date: '25 Avg', participants: '48 jamoa' },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Salom, John! Bugungi natijalaringizni ko'ring</p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
          <Flame size={20} />
          <span className="font-medium">5-kun streak!</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
                <span className="text-sm font-medium text-green-400">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-4">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Matches */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Oxirgi O'yinlar</h3>
              <button 
                onClick={() => onNavigate('/history')}
                className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
              >
                <span>Barchasini ko'rish</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentMatches.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                      <Gamepad2 size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{match.game}</h4>
                      <p className="text-sm text-gray-400">vs {match.opponent}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      match.result === 'Win' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                    }`}>
                      {match.result}
                    </span>
                    <p className="text-sm text-gray-400 mt-1">{match.score}</p>
                    <p className="text-xs text-gray-500">{match.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Kelayotgan Turnirlar</h3>
              <button 
                onClick={() => onNavigate('/tournaments')}
                className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
              >
                <span>Barchasini ko'rish</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTournaments.map((tournament, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => onNavigate('/tournaments')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">{tournament.name}</h4>
                    <span className="text-lg font-bold text-green-400">{tournament.prize}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span>{tournament.participants}</span>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                      Ro'yxatdan o'tish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TournamentsSection({ onNavigate }) {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Turnirlar</h1>
          <p className="text-gray-400 mt-1">Eng yaxshi turnirlarда qatnashing va g'alaba qozoning</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => onNavigate('/tournaments')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all flex items-center space-x-2"
          >
            <ExternalLink size={18} />
            <span>To'liq sahifa</span>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
            Turnir yaratish
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-700"></div>
              <div className="p-6">
                <div className="h-5 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-400 p-8">
          <p>{error}</p>
          <p className="text-sm text-gray-500 mt-2">Demo ma'lumotlar ko'rsatilmoqda</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <div 
            key={tournament.id} 
            className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 hover:shadow-lg transition-all overflow-hidden cursor-pointer"
            onClick={() => onNavigate('/tournaments')}
          >
            <div className="relative h-48">
              <img 
                src={tournament.image} 
                alt={tournament.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/logo/logo-removebg-preview.png';
                }}
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tournament.difficulty === 'Pro' ? 'bg-red-900/20 text-red-400' :
                  tournament.difficulty === 'Advanced' ? 'bg-orange-900/20 text-orange-400' :
                  'bg-green-900/20 text-green-400'
                }`}>
                  {tournament.difficulty}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {tournament.game}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{tournament.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Mukofat:</span>
                  <span className="font-bold text-green-400 text-lg">{tournament.prize}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Ishtirokchilar:</span>
                  <span className="font-medium text-white">{tournament.participants}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Boshlanish:</span>
                  <span className="font-medium text-white">{tournament.startDate}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tournament.status === 'Ro\'yxatdan o\'tish ochiq' 
                    ? 'bg-green-900/20 text-green-400' 
                    : 'bg-yellow-900/20 text-yellow-400'
                }`}>
                  {tournament.status}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Qatnashish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

 
 

 

export default DashboardContent