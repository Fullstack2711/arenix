'use client'
import React, { useState } from 'react'
import { 
  Settings, 
  User, 
  Bell,
  Lock,
  Globe,
  Gamepad2,
  Volume2,
  Monitor,
  Smartphone,
  Shield,
  Eye,
  Moon,
  Sun,
  Save,
  RefreshCw,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import UserSidebar from '../components/userSidebar'

function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    username: 'JohnDoe_Gamer',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Professional gamer and tournament champion',
    
    // Privacy Settings
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowFriendRequests: true,
    showGameActivity: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    gameInvites: true,
    tournamentUpdates: true,
    friendActivity: false,
    
    // Game Settings
    autoAcceptInvites: false,
    preferredRegion: 'asia',
    gameLanguage: 'uzbek',
    voiceChat: true,
    
    // Display Settings
    theme: 'dark',
    language: 'uzbek',
    timeFormat: '24h',
    dateFormat: 'dd/mm/yyyy',
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    
    // Audio Settings
    masterVolume: 80,
    gameVolume: 75,
    voiceVolume: 85,
    soundEffects: true
  });

  const [isChanged, setIsChanged] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setIsChanged(true);
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
    setIsChanged(false);
    // Show success message
  };

  const handleReset = () => {
    // Reset to default settings
    setIsChanged(false);
  };

  const sections = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'privacy', name: 'Maxfiylik', icon: Shield },
    { id: 'notifications', name: 'Bildirishnomalar', icon: Bell },
    { id: 'game', name: 'O\'yin sozlamalari', icon: Gamepad2 },
    { id: 'display', name: 'Ko\'rinish', icon: Monitor },
    { id: 'audio', name: 'Audio', icon: Volume2 },
    { id: 'security', name: 'Xavfsizlik', icon: Lock },
    { id: 'account', name: 'Hisob', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <UserSidebar activeTab="settings" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">⚙️ Sozlamalar</h1>
          <p className="text-gray-400 text-xl">
            Hisobingiz va o'yin sozlamalarini boshqaring
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-8">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{section.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Profil sozlamalari</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Foydalanuvchi nomi
                      </label>
                      <input
                        type="text"
                        value={settings.username}
                        onChange={(e) => handleSettingChange('username', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Ism
                      </label>
                      <input
                        type="text"
                        value={settings.firstName}
                        onChange={(e) => handleSettingChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Familiya
                      </label>
                      <input
                        type="text"
                        value={settings.lastName}
                        onChange={(e) => handleSettingChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      value={settings.bio}
                      onChange={(e) => handleSettingChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Maxfiylik sozlamalari</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Profil ko'rinishi</h3>
                        <p className="text-sm text-gray-400">Profilingizni kim ko'rishi mumkin</p>
                      </div>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                        className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="public">Hamma</option>
                        <option value="friends">Faqat do'stlar</option>
                        <option value="private">Shaxsiy</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Online status ko'rsatish</h3>
                        <p className="text-sm text-gray-400">Onlayn ekanligingizni ko'rsatish</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.showOnlineStatus}
                          onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Do'stlik so'rovlariga ruxsat</h3>
                        <p className="text-sm text-gray-400">Yangi do'stlik so'rovlarini qabul qilish</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.allowFriendRequests}
                          onChange={(e) => handleSettingChange('allowFriendRequests', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Bildirishnoma sozlamalari</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Email bildirishnomalar</h3>
                        <p className="text-sm text-gray-400">Email orqali bildirishnomalar olish</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Push bildirishnomalar</h3>
                        <p className="text-sm text-gray-400">Brauzer orqali bildirishnomalar</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Turnir yangiliklari</h3>
                        <p className="text-sm text-gray-400">Turnir boshlanishi va natijalari haqida</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.tournamentUpdates}
                          onChange={(e) => handleSettingChange('tournamentUpdates', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Xavfsizlik sozlamalari</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Ikki faktorli autentifikatsiya</h3>
                        <p className="text-sm text-gray-400">Hisobingizni qo'shimcha himoyalash</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white">Kirish ogohlantirishlari</h3>
                        <p className="text-sm text-gray-400">Yangi qurilmadan kirganingizda xabar olish</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.loginAlerts}
                          onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="font-medium text-white mb-2">Parolni o'zgartirish</h3>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Joriy parol"
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Yangi parol"
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Yangi parolni tasdiqlang"
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                          Parolni yangilash
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeSection === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Hisob sozlamalari</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-red-900/20 border border-red-700 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="text-red-400 mt-1" size={20} />
                        <div className="flex-1">
                          <h3 className="font-medium text-red-400 mb-2">Xavfli zona</h3>
                          <p className="text-red-300 text-sm mb-4">
                            Bu amallar qaytarib bo'lmaydigan natijalar berishi mumkin. Ehtiyot bo'ling!
                          </p>
                          
                          <div className="space-y-3">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                              <Trash2 size={16} />
                              <span>Hisobni o'chirish</span>
                            </button>
                            
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                              <RefreshCw size={16} />
                              <span>Barcha ma'lumotlarni qayta tiklash</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="font-medium text-white mb-4">Ma'lumotlarni eksport qilish</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Barcha shaxsiy ma'lumotlaringizni yuklab olish
                      </p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Ma'lumotlarni yuklab olish
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              {isChanged && (
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Save size={18} />
                      <span>O'zgarishlarni saqlash</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Bekor qilish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
