'use client'
import React, { useState } from 'react'
import { 
  Award, 
  Trophy, 
  Star, 
  Crown,
  Target,
  Flame,
  Zap,
  Shield,
  Gamepad2,
  Calendar,
  CheckCircle,
  Clock,
  ProgressBar
} from 'lucide-react'
import UserSidebar from '../components/userSidebar'

function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      title: 'First Blood',
      description: 'Birinchi g\'alabangizni qo\'lga kiriting',
      icon: '🥇',
      category: 'general',
      earned: true,
      date: '2024-01-10',
      points: 100,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Tournament Master',
      description: '10 ta turnirda g\'alaba qozoning',
      icon: '🏆',
      category: 'tournament',
      earned: true,
      date: '2024-01-15',
      points: 500,
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Streak Master',
      description: '10 ta ketma-ket g\'alaba',
      icon: '🔥',
      category: 'general',
      earned: true,
      date: '2024-01-20',
      points: 300,
      rarity: 'uncommon'
    },
    {
      id: 4,
      title: 'Pro Player',
      description: '1000 ta o\'yin o\'ynang',
      icon: '⭐',
      category: 'general',
      earned: true,
      date: '2024-01-25',
      points: 750,
      rarity: 'epic'
    },
    {
      id: 5,
      title: 'Champion',
      description: 'Eng yirik turnirda g\'alaba qozoning',
      icon: '👑',
      category: 'tournament',
      earned: false,
      progress: 75,
      points: 1000,
      rarity: 'legendary'
    },
    {
      id: 6,
      title: 'Legend',
      description: 'Reyting 3000 ga yeting',
      icon: '🌟',
      category: 'rating',
      earned: false,
      progress: 45,
      points: 1500,
      rarity: 'legendary'
    },
    {
      id: 7,
      title: 'Speed Demon',
      description: '1 daqiqada 3 ta g\'alaba qozoning',
      icon: '⚡',
      category: 'special',
      earned: false,
      progress: 20,
      points: 800,
      rarity: 'epic'
    },
    {
      id: 8,
      title: 'Team Player',
      description: '50 ta jamoa o\'yinida qatnashing',
      icon: '🤝',
      category: 'social',
      earned: true,
      date: '2024-01-18',
      points: 400,
      rarity: 'rare'
    }
  ];

  const categories = [
    { id: 'all', name: 'Hammasi', icon: Award },
    { id: 'general', name: 'Umumiy', icon: Star },
    { id: 'tournament', name: 'Turnir', icon: Trophy },
    { id: 'rating', name: 'Reyting', icon: Crown },
    { id: 'special', name: 'Maxsus', icon: Flame },
    { id: 'social', name: 'Ijtimoiy', icon: Gamepad2 }
  ];

  const rarityColors = {
    common: 'border-gray-500 bg-gray-500/10',
    uncommon: 'border-green-500 bg-green-500/10',
    rare: 'border-blue-500 bg-blue-500/10',
    epic: 'border-purple-500 bg-purple-500/10',
    legendary: 'border-yellow-500 bg-yellow-500/10'
  };

  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeCategory);

  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <UserSidebar activeTab="achievements" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🏆 Yutuqlar</h1>
          <p className="text-gray-400 text-xl">
            O'yin jarayonidagi muvaffaqiyatlaringiz va yutuqlaringiz
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <Trophy className="text-yellow-400 mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">{earnedCount}</h3>
            <p className="text-gray-400 text-sm">Qo'lga kiritilgan</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <Target className="text-blue-400 mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">{achievements.length}</h3>
            <p className="text-gray-400 text-sm">Jami yutuqlar</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <Star className="text-purple-400 mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">{totalPoints}</h3>
            <p className="text-gray-400 text-sm">Jami ochko</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <Crown className="text-green-400 mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">{Math.round((earnedCount / achievements.length) * 100)}%</h3>
            <p className="text-gray-400 text-sm">Tugallangan</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon size={16} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                achievement.earned
                  ? `${rarityColors[achievement.rarity]} shadow-lg`
                  : 'bg-gray-800 border-gray-600 opacity-75'
              }`}
            >
              <div className="text-center">
                {/* Icon */}
                <div className={`text-5xl mb-4 ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>

                {/* Title */}
                <h3 className={`font-bold text-lg mb-2 ${
                  achievement.earned ? 'text-white' : 'text-gray-400'
                }`}>
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                {/* Rarity Badge */}
                <div className="flex justify-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    achievement.rarity === 'common' ? 'bg-gray-600 text-gray-200' :
                    achievement.rarity === 'uncommon' ? 'bg-green-600 text-green-100' :
                    achievement.rarity === 'rare' ? 'bg-blue-600 text-blue-100' :
                    achievement.rarity === 'epic' ? 'bg-purple-600 text-purple-100' :
                    'bg-yellow-600 text-yellow-100'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>

                {/* Status */}
                {achievement.earned ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">Qo'lga kiritildi</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
                      <Calendar size={12} />
                      <span>{achievement.date}</span>
                    </div>
                    <div className="text-center">
                      <span className="inline-block bg-yellow-600 text-yellow-100 px-2 py-1 rounded text-xs font-medium">
                        +{achievement.points} ochko
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                      <Clock size={16} />
                      <span className="text-sm">Jarayonda</span>
                    </div>
                    
                    {achievement.progress && (
                      <div className="space-y-1">
                        <div className="bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <p className="text-gray-400 text-xs">{achievement.progress}% tugallandi</p>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                        {achievement.points} ochko
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Bu kategoriyada yutuqlar topilmadi</div>
            <p className="text-gray-500">Boshqa kategoriyalarni sinab ko'ring</p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default AchievementsPage
