'use client'
import React, { useState, useEffect } from 'react'
import { 
  Star, 
  Search,
  Filter,
  Play,
  Download,
  Clock
} from 'lucide-react'
import axios from 'axios'
import UserSidebar from '../components/userSidebar'
import Image from 'next/image'
import { CardSpotlightDemo } from '../components/CardApple'

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://3eb989695206.ngrok-free.app/api'

function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/tournaments/games/`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        
        if (response.status === 200) {
          setGames(response.data);
        } else {
          throw new Error('Failed to fetch games');
        }
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('O\'yinlarni yuklashda xatolik');
        // Demo ma'lumotlar
        setGames(
          response.data)
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleCClickId = (game_id) => {
     window.location.href = `/games/${game_id}`;
  }


  const categories = ['all', 'FPS', 'MOBA', 'Battle Royale', 'Strategy', 'Sports'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* User Sidebar */}
      <UserSidebar activeTab="games" />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 pt-8">
        <div className="max-w-7xl mx-auto rounded-2xl border border-gray-700/30 bg-gray-900/80">
        {/* Header */}
        <div className="text-center mb-12 rounded-xl border border-gray-700/20 bg-gray-800/60 p-6">
          <h1 className="text-5xl font-bold text-white mb-4">🎮 O'yinlar</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Sevimli o'yinlaringizni tanlang va turnirlarда qatnashing
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 rounded-xl border border-gray-700/20 bg-gray-800/60 p-4">
          {/* Search */}
          <div className="relative flex-1 rounded-xl overflow-hidden">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="O'yin nomini qidiring..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
            />
          </div>

          {/* Category Filter */}
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-10 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500 cursor-pointer appearance-none min-w-[200px] rounded-xl"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category === 'all' ? 'Barcha kategoriyalar' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-700 rounded-t-2xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-400 p-8 bg-gray-800 rounded-2xl border border-gray-700/20">
            <p className="text-lg">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Demo ma'lumotlar ko'rsatilmoqda</p>
          </div>
        )}

        {/* All Games Grid */}
        {!loading && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Barcha O'yinlar ({filteredGames.length})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-9">
              {filteredGames.map((game) => (
                <div className="relative">
                  <CardSpotlightDemo
                    key={game.id}
                    img={`${API_URL}${game.image}`}
                    name={game.name}
                    description={game.description}
                    category={game.category}
                    rating={game.rating}
                    players={game.players}
                    size={game.size}
                    status={game.status}
                    onClick={() => handleCClickId(game.id)}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCClickId(game.id);
                    }}
                    className="absolute top-68 left-1/2  -translate-x-1/2 z-40 bg-blue-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1"
                    style={{ minWidth: 120 }}
                  >
                    <Download size={14} />
                    <span>Qo'shilish</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* No Results */}
        {!loading && filteredGames.length === 0 && (
          <div className="text-center py-12 rounded-xl border border-gray-700/20 bg-gray-800/60">
            <div className="text-gray-400 text-lg mb-2">Hech qanday o'yin topilmadi</div>
            <p className="text-gray-500">Qidiruv shartlarini o'zgartiring</p>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default GamesPage
