'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Trophy,
  Users,
  DollarSign,
  MapPin,
  Star,
  Play,
  User,
  Crown,
  Target
} from 'lucide-react'
import axios from 'axios'
import UserSidebar from '../../components/userSidebar'
import { getAccessToken } from '../../../lib/auth';
import Image from 'next/image'
const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://3eb989695206.ngrok-free.app/api'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://3eb989695206.ngrok-free.app'

function TournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        
      } catch (err) {
        setError('Turnir ma\'lumotlarini yuklashda xatolik');
      } finally {
        setLoading(false);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const access_token = getAccessToken();
        const response = await axios.get(`${API_URL}/tournaments/leaderboard/`, {
          params: { tournament_id: params.id },
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            Authorization: `Bearer ${access_token}`,
          },

        });
        if (response.status === 200) {
          setLeaderboard(response.data);
        } else {
          setLeaderboard([]);
        }
      } catch (err) {
        setLeaderboard([]);
      }
    };

    if (params.id) {
      fetchTournament();
      fetchLeaderboard();
    }
  }, [params.id]);

  const handleRegister = async () => {
    try {
      // Tournament registration logic here
      setIsRegistered(true)
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        <UserSidebar activeTab="tournaments" />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-700 rounded-xl mb-8"></div>
              <div className="h-8 bg-gray-700 rounded mb-4 w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded mb-8 w-1/2"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-700 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        <UserSidebar activeTab="tournaments" />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="text-center text-red-400 p-8 bg-gray-800 rounded-xl">
              <p className="text-lg">{error}</p>
              <button 
                onClick={() => router.back()}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Orqaga qaytish
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <UserSidebar activeTab="tournaments" />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Orqaga</span>
          </button>

          {/* Leaderboard Table */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Turnir Leaderboard</h2>
            {leaderboard.length === 0 ? (
              <div className="text-gray-400">Hozircha natijalar yo'q</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-gray-300">#</th>
                      <th className="px-4 py-2 text-gray-300">Foydalanuvchi</th>
                      <th className="px-4 py-2 text-gray-300">KDA</th>
                      <th className="px-4 py-2 text-gray-300">Qo'shilgan vaqti</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                        <td className="px-4 py-2">{idx + 1}</td>
                        <td className="px-4 py-2 flex items-center gap-2">
                          {item.profile_image && (
                            <Image
                              src={`${BASE_URL}${item.profile_image}`}
                              alt={item.username}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full object-cover border border-gray-700"
                               
                            />
                          )}
                          <span>{item.username}</span>
                        </td>
                        <td className="px-4 py-2">{item.kda_score}</td>
                        <td className="px-4 py-2">{new Date(item.joined_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentDetailPage
