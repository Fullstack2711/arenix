'use client'
import React, { useState } from 'react'
import { 
  History, 
  Gamepad2, 
  Trophy,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Star,
  Target,
  Award,
  Search
} from 'lucide-react'
import UserSidebar from '../components/userSidebar'

function HistoryPage() {
  const [activeTab, setActiveTab] = useState('matches');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterGame, setFilterGame] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const matchHistory = [
    {
      id: 1,
      game: 'CS:GO',
      opponent: 'Team Alpha',
      result: 'Win',
      score: '16-14',
      date: '2024-01-28',
      time: '18:30',
      duration: '45 min',
      rating: '+25',
      map: 'de_dust2',
      mode: 'Competitive'
    },
    {
      id: 2,
      game: 'Dota 2',
      opponent: 'Pro Gamers',
      result: 'Win',
      score: '2-1',
      date: '2024-01-27',
      time: '20:15',
      duration: '52 min',
      rating: '+18',
      map: 'Ancient',
      mode: 'Ranked'
    },
    {
      id: 3,
      game: 'PUBG',
      opponent: 'Squad X',
      result: 'Loss',
      score: '#3',
      date: '2024-01-27',
      time: '16:45',
      duration: '28 min',
      rating: '-12',
      map: 'Erangel',
      mode: 'Squad'
    },
    {
      id: 4,
      game: 'FIFA 24',
      opponent: 'FC Masters',
      result: 'Win',
      score: '3-1',
      date: '2024-01-26',
      time: '19:20',
      duration: '15 min',
      rating: '+15',
      map: 'Old Trafford',
      mode: 'Seasons'
    },
    {
      id: 5,
      game: 'CS:GO',
      opponent: 'Noob Squad',
      result: 'Win',
      score: '16-8',
      date: '2024-01-26',
      time: '21:00',
      duration: '35 min',
      rating: '+22',
      map: 'de_mirage',
      mode: 'Competitive'
    }
  ];

  const tournamentHistory = [
    {
      id: 1,
      name: 'CS:GO Winter Championship',
      game: 'CS:GO',
      position: 1,
      prize: '$500',
      date: '2024-01-20',
      participants: 64,
      status: 'completed'
    },
    {
      id: 2,
      name: 'Dota 2 Pro League',
      game: 'Dota 2',
      position: 3,
      prize: '$150',
      date: '2024-01-15',
      participants: 32,
      status: 'completed'
    },
    {
      id: 3,
      name: 'PUBG Battle Royale',
      game: 'PUBG',
      position: 8,
      prize: '$0',
      date: '2024-01-10',
      participants: 100,
      status: 'completed'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Blood',
      game: 'CS:GO',
      date: '2024-01-25',
      points: 100
    },
    {
      id: 2,
      title: 'Tournament Winner',
      game: 'CS:GO',
      date: '2024-01-20',
      points: 500
    },
    {
      id: 3,
      title: 'Team Player',
      game: 'Dota 2',
      date: '2024-01-18',
      points: 200
    }
  ];

  const games = ['CS:GO', 'Dota 2', 'PUBG', 'FIFA 24'];
  const periods = [
    { value: 'all', label: 'Barcha vaqt' },
    { value: 'today', label: 'Bugun' },
    { value: 'week', label: 'Bu hafta' },
    { value: 'month', label: 'Bu oy' }
  ];

  const filteredMatches = matchHistory.filter(match => {
    const matchesGame = filterGame === 'all' || match.game === filterGame;
    const matchesSearch = match.opponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.game.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGame && matchesSearch;
  });

  const winRate = Math.round((filteredMatches.filter(m => m.result === 'Win').length / filteredMatches.length) * 100) || 0;
  const totalMatches = filteredMatches.length;
  const totalWins = filteredMatches.filter(m => m.result === 'Win').length;

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <UserSidebar activeTab="history" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">📊 Tarix</h1>
          <p className="text-gray-400 text-xl">
            O'yin tarixi, turnirlar va yutuqlaringiz
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <Gamepad2 className="text-blue-400 mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">{totalMatches}</h3>
            <p className="text-gray-400 text-sm">Jami o'yinlar</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <Trophy className="text-yellow-400 mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">{totalWins}</h3>
            <p className="text-gray-400 text-sm">G'alabalar</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <TrendingUp className="text-green-400 mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">{winRate}%</h3>
            <p className="text-gray-400 text-sm">G'alaba foizi</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <Award className="text-purple-400 mx-auto mb-3" size={32} />
            <h3 className="text-2xl font-bold text-white mb-1">{tournamentHistory.length}</h3>
            <p className="text-gray-400 text-sm">Turnirlar</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: 'matches', label: 'O\'yinlar tarixi' },
              { id: 'tournaments', label: 'Turnirlar' },
              { id: 'achievements', label: 'Yutuqlar' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters for matches */}
        {activeTab === 'matches' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Raqib yoki o'yin nomi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              
              <select
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">Barcha o'yinlar</option>
                {games.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
              
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'matches' && (
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">O'yinlar tarixi</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left text-gray-300 py-3 px-6">O'yin</th>
                    <th className="text-left text-gray-300 py-3 px-6">Raqib</th>
                    <th className="text-left text-gray-300 py-3 px-6">Natija</th>
                    <th className="text-left text-gray-300 py-3 px-6">Hisob</th>
                    <th className="text-left text-gray-300 py-3 px-6">Sana</th>
                    <th className="text-left text-gray-300 py-3 px-6">Reyting</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMatches.map((match, index) => (
                    <tr key={match.id} className={`border-b border-gray-700 hover:bg-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <Gamepad2 className="text-gray-400" size={20} />
                          <div>
                            <div className="font-medium text-white">{match.game}</div>
                            <div className="text-sm text-gray-400">{match.mode}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-white">{match.opponent}</div>
                          <div className="text-sm text-gray-400">{match.map}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          match.result === 'Win' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                        }`}>
                          {match.result}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-white">{match.score}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-white">{match.date}</div>
                          <div className="text-sm text-gray-400">{match.time} • {match.duration}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-bold ${
                          match.rating.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {match.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Turnirlar tarixi</h3>
            
            <div className="space-y-4">
              {tournamentHistory.map((tournament) => (
                <div key={tournament.id} className="p-6 bg-gray-700 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{tournament.name}</h4>
                      <p className="text-gray-400">{tournament.game}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        tournament.position === 1 ? 'text-yellow-400' :
                        tournament.position <= 3 ? 'text-blue-400' : 'text-gray-400'
                      }`}>
                        #{tournament.position}
                      </div>
                      <div className="text-sm text-gray-400">
                        {tournament.participants} ishtirokchi
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy size={16} />
                        <span className="text-green-400 font-medium">{tournament.prize}</span>
                      </div>
                    </div>
                    <span className="bg-green-900/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      Tugallandi
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">So'nggi yutuqlar</h3>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-900/20 p-3 rounded-lg">
                      <Award className="text-yellow-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{achievement.title}</h4>
                      <p className="text-gray-400">{achievement.game}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">+{achievement.points}</div>
                    <div className="text-sm text-gray-400">{achievement.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
