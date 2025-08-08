'use client'
import React, { useState } from 'react'
import UserSidebar from '../components/userSidebar'

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe_gamer',
    email: 'john.doe@example.com',
    phone: '+998 99 123 45 67',
    country: 'O\'zbekiston',
    city: 'Toshkent',
    bio: 'Professional gamer and tournament champion. Specialized in FPS and MOBA games.',
    birthDate: '1995-03-15'
  });

  const [tempData, setTempData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const stats = [
    {
      label: 'Umumiy o\'yinlar',
      value: '1,247',
      icon: '🎮',
      color: 'text-blue-400'
    },
    {
      label: 'G\'alabalar',
      value: '892',
      icon: '🏆',
      color: 'text-yellow-400'
    },
    {
      label: 'Turnir yutuqlari',
      value: '24',
      icon: '👑',
      color: 'text-purple-400'
    },
    {
      label: 'Reyting',
      value: '2,847',
      icon: '⭐',
      color: 'text-green-400'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Blood',
      description: 'Birinchi g\'alabangizni qo\'lga kiriting',
      icon: '🥇',
      earned: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'Tournament Master',
      description: '10 ta turnirda g\'alaba qozoning',
      icon: '🏆',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 3,
      title: 'Streak Master',
      description: '10 ta ketma-ket g\'alaba',
      icon: '🔥',
      earned: true,
      date: '2024-01-20'
    },
    {
      id: 4,
      title: 'Pro Player',
      description: '1000 ta o\'yin o\'ynang',
      icon: '⭐',
      earned: true,
      date: '2024-01-25'
    },
    {
      id: 5,
      title: 'Champion',
      description: 'Eng yirik turnirda g\'alaba qozoning',
      icon: '👑',
      earned: false,
      progress: 75
    },
    {
      id: 6,
      title: 'Legend',
      description: 'Reyting 3000 ga yeting',
      icon: '🌟',
      earned: false,
      progress: 45
    }
  ];

  const recentMatches = [
    {
      game: 'CS:GO',
      result: 'Win',
      score: '16-14',
      opponent: 'Team Alpha',
      date: '2024-01-20',
      rating: '+25'
    },
    {
      game: 'Dota 2',
      result: 'Win',
      score: '2-1',
      opponent: 'Pro Gamers',
      date: '2024-01-19',
      rating: '+18'
    },
    {
      game: 'PUBG',
      result: 'Loss',
      score: '#3',
      opponent: 'Squad X',
      date: '2024-01-18',
      rating: '-12'
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <UserSidebar activeTab="profile" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">👤 Profil</h1>
          <p className="text-gray-400 text-xl">
            Shaxsiy ma'lumotlaringizni boshqaring va yutuqlaringizni ko'ring
          </p>
        </div>

        {/* Profile Header */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white transition-colors">
                <span className="text-sm">📷</span>
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-blue-400 text-lg mb-2">@{profileData.username}</p>
              <p className="text-gray-300 mb-4 max-w-md">{profileData.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{profileData.city}, {profileData.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>📅</span>
                  <span>Qo'shilgan: Yanvar 2024</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>✏️</span>
              <span>Tahrirlash</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            return (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <div className={`text-4xl mx-auto mb-3`}>{stat.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {['profile', 'achievements', 'matches'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'profile' ? 'Shaxsiy ma\'lumotlar' :
                 tab === 'achievements' ? 'Yutuqlar' : 'O\'yinlar tarixi'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Shaxsiy ma'lumotlar</h3>
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>💾</span>
                    <span>Saqlash</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>❌</span>
                    <span>Bekor qilish</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Ism</label>
                <input
                  type="text"
                  name="firstName"
                  value={isEditing ? tempData.firstName : profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Familiya</label>
                <input
                  type="text"
                  name="lastName"
                  value={isEditing ? tempData.lastName : profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Foydalanuvchi nomi</label>
                <input
                  type="text"
                  name="username"
                  value={isEditing ? tempData.username : profileData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={isEditing ? tempData.email : profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={isEditing ? tempData.phone : profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Tug'ilgan sana</label>
                <input
                  type="date"
                  name="birthDate"
                  value={isEditing ? tempData.birthDate : profileData.birthDate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  rows={4}
                  value={isEditing ? tempData.bio : profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Yutuqlar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30'
                      : 'bg-gray-700 border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-4xl mb-3 ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <h4 className={`font-bold mb-2 ${achievement.earned ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <div className="flex items-center justify-center space-x-1 text-green-400 text-sm">
                        <span>🏅</span>
                        <span>Qo'lga kiritildi: {achievement.date}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <p className="text-gray-400 text-xs">{achievement.progress}% tugallandi</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">So'nggi o'yinlar</h3>
            <div className="space-y-4">
              {recentMatches.map((match, index) => (
                <div key={index} className="p-6 bg-gray-700 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">🎮</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{match.game}</h4>
                      <p className="text-gray-400 text-sm">vs {match.opponent}</p>
                      <p className="text-gray-500 text-xs">{match.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      match.result === 'Win' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                    }`}>
                      {match.result}
                    </span>
                    <p className="text-white font-bold mt-1">{match.score}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className={match.rating.startsWith('+') ? 'text-green-400' : 'text-red-400'}>📈</span>
                      <span className={`font-bold ${match.rating.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {match.rating}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">Reyting</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Profilni tahrirlash</h3>
              {/* Form content here - same as above */}
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default ProfilePage
