"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Users, Mail, Hash, Loader2, AlertCircle, Trophy, DollarSign, Coins, Sword, Gamepad2, Calendar, BarChart2 } from 'lucide-react';
import { getAccessToken } from '../../../lib/auth';
import UserSidebar from '../../components/userSidebar';
import Image from 'next/image';
 
const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://920b73597eff.ngrok-free.app/api';

function UserDetailPage() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      setImageError(false);
      try {
        const access_token = getAccessToken();
        if (!access_token) {
          throw new Error('No access token found');
        }
        const response = await axios.get(`${API_URL}/users/${params.id}/`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${access_token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Foydalanuvchi topilmadi');
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchUser();
  }, [params.id]);

  return (
        < >
    
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-900/95 border-r border-gray-700/20 shadow-lg backdrop-blur-md">
        <UserSidebar activeTab="friend" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <div className="bg-gray-800/60 rounded-4xl shadow-2xl p-8 flex flex-col items-center border border-gray-500/30 backdrop-blur-xl animate-in fade-in duration-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-gray-200 animate-spin" />
                <span className="mt-2 text-sm text-gray-200">Yuklanmoqda...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
                <span className="text-sm text-red-400">{error}</span>
              </div>
            )}

            {/* User Details */}
            {!loading && !error && user && (
              <>
                {/* Profile Image & Name */}
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300/50 mb-6 border-4 border-gray-500/30 shadow-lg transition-transform duration-300 hover:scale-105">
                  {imageError || !user.profile_image ? (
                    <div className="w-full h-full bg-gray-600/50 text-white flex items-center justify-center text-2xl font-bold">
                      {user.username?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  ) : (
                    <Image
                      src={ `${API_URL}${user.profile_image}`}
                      alt={user.username}
                      className="w-full h-full object-cover"
                      width={100}
                     height={100}
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
                <h2 className="text-xl font-bold bg-clip-text pb-2 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-1 tracking-tight">
                  {user.username || 'No name'}
                </h2>
                 
                

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  <div className="flex flex-col items-center bg-gray-900/50 rounded-3xl p-4 border border-gray-500/20 backdrop-blur-md transition-all duration-200 hover:bg-gray-900/60 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <Coins className="w-5 h-5 text-yellow-400 mb-1" />
                    <span className="text-base font-semibold text-white">{user.coin ?? 0}</span>
                    <span className="text-xs text-gray-300">Coin</span>
                  </div>
                  <div className="flex flex-col items-center bg-gray-900/50 rounded-3xl p-4 border border-gray-500/20 backdrop-blur-md transition-all duration-200 hover:bg-gray-900/60 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <DollarSign className="w-5 h-5 text-green-400 mb-1" />
                    <span className="text-base font-semibold text-white">{user.dollar ?? 0}</span>
                    <span className="text-xs text-gray-300">Dollar</span>
                  </div>
                  <div className="flex flex-col items-center bg-gray-900/50 rounded-3xl p-4 border border-gray-500/20 backdrop-blur-md transition-all duration-200 hover:bg-gray-900/60 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <Trophy className="w-5 h-5 text-orange-400 mb-1" />
                    <span className="text-base font-semibold text-white">{user.wins ?? 0}</span>
                    <span className="text-xs text-gray-300">Wins</span>
                  </div>
                  <div className="flex flex-col items-center bg-gray-900/50 rounded-3xl p-4 border border-gray-500/20 backdrop-blur-md transition-all duration-200 hover:bg-gray-900/60 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <Gamepad2 className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-base font-semibold text-white">{user.active_tournaments ?? 0}</span>
                    <span className="text-xs text-gray-300">Active Tournaments</span>
                  </div>
                </div>

                {/* Last Matches */}
                <div className="w-full">
                  <h3 className="text-base font-semibold text-white mb-3 flex items-center">
                    <BarChart2 className="w-4 h-4 mr-2 text-purple-400" />
                    Last Matches
                  </h3>
                  {user.last_matches && user.last_matches.length > 0 ? (
                    <div className="space-y-3">
                      {user.last_matches.slice(0, 5).map((match) => (
                        <div
                          key={match.id}
                          className="flex items-center justify-between bg-gray-900/50 rounded-3xl p-3 border border-gray-500/20 backdrop-blur-md transition-all duration-200 hover:bg-gray-900/60 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                        >
                          <div className="flex items-center space-x-2">
                            <Sword className="w-4 h-4 text-gray-300" />
                            <span className="text-sm text-white font-medium">Match #{match.id}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-gray-200">
                            <span className="flex items-center">
                              <Trophy className="w-3 h-3 mr-1 text-orange-400" /> {match.kills} K
                            </span>
                            <span className="flex items-center">
                              <Users className="w-3 h-3 mr-1 text-red-400" /> {match.deaths} D
                            </span>
                            <span className="flex items-center">
                              <Gamepad2 className="w-3 h-3 mr-1 text-blue-400" /> {match.assists} A
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1 text-gray-300" />{' '}
                              {new Date(match.match_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-300 text-sm text-center py-3">No recent matches</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
        </ >
  );
}

export default UserDetailPage;