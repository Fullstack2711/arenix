'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Users,
  Trophy,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Play,
  User,
  Crown,
  Target,
} from 'lucide-react';
import axios from 'axios';
import UserSidebar from '../../components/userSidebar';
import { getAccessToken } from '../../../lib/auth';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://3eb989695206.ngrok-free.app/api';

function TournamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState({}); // { [tournamentId]: true }
  const [registerError, setRegisterError] = useState({}); // { [tournamentId]: errorMsg }
  const [imageErrors, setImageErrors] = useState({}); // Track image load failures

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        setError(null);
        const access_token = getAccessToken();
        if (!access_token) {
          throw new Error('No access token found');
        }
        const response = await axios.get(`${API_URL}/tournaments/tournaments/?game_id=${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            Authorization: `Bearer ${access_token}`,
          },
        });
        const tournamentsList = Array.isArray(response.data) ? response.data : response.data.results || [];
        setTournaments(tournamentsList);
        // Fetch registration status for each tournament
        const regStatus = {};
        for (const t of tournamentsList) {
          try {
            const regRes = await axios.get(`${API_URL}/tournaments/tournaments/${t.id}/is-registered/`, {
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${access_token}`,
              },
            });
            regStatus[t.id] = regRes.data?.is_registered || false;
          } catch {
            regStatus[t.id] = false;
          }
        }
        setRegistered(regStatus);
      } catch (err) {
        console.error('Error fetching tournament:', err);
        setError("Turnir ma'lumotlarini yuklashda xatolik");
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchTournament();
  }, [params.id]);

  const handleRegister = async (tournamentId) => {
    try {
      setRegisterError((prev) => ({ ...prev, [tournamentId]: null }));
      const access_token = getAccessToken();
      if (!access_token) {
        throw new Error('No access token found');
      }
      console.log('Attempting to join tournament:', tournamentId);
      console.log('API URL:', `${API_URL}/tournaments/tournaments/${tournamentId}/join/`);

      const response = await axios.post(
        `${API_URL}/tournaments/tournaments/${tournamentId}/join/`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log('Join response:', response.data);
      setRegistered((prev) => ({ ...prev, [tournamentId]: true }));
    } catch (error) {
      console.error('Registration error:', error);
      let msg = 'Turnirga qo‘shilishda xatolik yuz berdi';
      if (
        error?.response?.data?.detail === 'Tournament is not open for registration' ||
        error?.response?.data?.message === 'Tournament is not open for registration'
      ) {
        msg = 'Turnirga hozircha ro‘yxatdan o‘tib bo‘lmaydi. Ro‘yxatdan o‘tish ochilmagan.';
      }
      setRegisterError((prev) => ({ ...prev, [tournamentId]: msg }));
    }
  };

  const handleImageError = (id, type) => {
    setImageErrors((prev) => ({ ...prev, [`${id}-${type}`]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-900/95 border-r border-gray-700/20 shadow-lg backdrop-blur-md">
        <UserSidebar activeTab="tournaments" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Orqaga</span>
          </button>

          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
            O'yin uchun turnirlar
          </h1>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-800/50 rounded-4xl h-96 border border-gray-700/20"></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-gray-800/60 rounded-4xl p-6 text-center text-red-400 border border-gray-500/20 backdrop-blur-xl">
              <p className="text-lg">{error}</p>
              <button
                onClick={() => router.back()}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                Orqaga qaytish
              </button>
            </div>
          ) : tournaments.length === 0 ? (
            <div className="text-center text-gray-300 py-12 bg-gray-800/60 rounded-4xl p-6 border border-gray-500/20 backdrop-blur-xl">
              Hech qanday turnir topilmadi
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="bg-gray-800/60 rounded-4xl shadow-lg border border-gray-500/30 backdrop-blur-xl animate-in fade-in duration-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/tournaments/${tournament.id}`)}
                >
                  {/* Banner Image */}
                  <div className="relative h-48">
                    {imageErrors[`${tournament.id}-banner`] ? (
                      <div className="w-full h-full bg-gray-600/50 flex items-center justify-center text-gray-300 text-sm">
                        Image not available
                      </div>
                    ) : (
                      <Image
                        src={tournament.image || '/default-tournament.jpg'}
                        alt={tournament.title || 'Tournament Image'}
                        width={800}
                        height={400}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(tournament.id, 'banner')}
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-semibold backdrop-blur-sm">
                      {tournament.status}
                    </div>
                  </div>

                  {/* Tournament Details */}
                  <div className="p-6 flex flex-col gap-3 " onClick={e => e.stopPropagation()}>
                    <h2 className="text-lg font-semibold text-white mb-1">{tournament.title}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      {imageErrors[`${tournament.id}-game`] ? (
                        <div className="w-8 h-8 rounded-full bg-gray-600/50 flex items-center justify-center text-gray-300 text-xs">
                          ?
                        </div>
                      ) : (
                        <Image
                          src={`${tournament.game?.image}`}
                          alt={tournament.game?.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-600/20"
                          onError={() => handleImageError(tournament.id, 'game')}
                          width={100}
                          height={100}
                        />
                      )}
                      <span className="text-gray-200 text-sm">{tournament.game?.name || 'Unknown Game'}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300 text-xs mb-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-blue-400" />
                        <span>
                          {new Date(tournament.start_date).toLocaleDateString()} -{' '}
                          {new Date(tournament.end_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-green-400" />
                        <span>
                          {tournament.participant_count} / {tournament.max_participants} ishtirokchi
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                      {tournament.description || tournament.game?.description || 'No description available'}
                    </p>
                    {!registered[tournament.id] && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRegister(tournament.id); }}
                        disabled={tournament.status !== 'ONGOING'}
                        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          tournament.status !== 'ONGOING'
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {tournament.status !== 'ONGOING'
                          ? 'Ro‘yxatdan o‘tish  '
                          : 'Turnirga qo‘shilish'}
                      </button>
                    )}
                    {registerError[tournament.id] && (
                      <div className="text-xs text-red-400 mt-2 text-center">
                        {registerError[tournament.id]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TournamentDetailPage;