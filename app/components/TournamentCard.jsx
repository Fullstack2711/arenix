"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { joinTournament } from '../utils/tournaments';
import { useState } from 'react';

const TournamentCard = ({ tournament }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      // Bu yerda userId ni localStorage yoki context dan olish kerak
      const userId = localStorage.getItem('userId') || '1'; // Vaqtinchalik
      await joinTournament(tournament.id, userId);
      setHasJoined(true);
    } catch (error) {
      console.error('Error joining tournament:', error);
      alert('Turnirga qo\'shilishda xatolik yuz berdi');
    } finally {
      setIsJoining(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sana ko\'rsatilmagan';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'ongoing':
        return <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">LIVE</span>;
      case 'upcoming':
        return <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">TEZDA</span>;
      case 'completed':
        return <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">TUGAGAN</span>;
      default:
        return <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">YANGI</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 text-white w-full max-w-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={tournament.image || "/logo/logo.jpg"}
          alt={tournament.name || "Tournament"}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {getStatusBadge(tournament.status)}
        </div>

        {/* Prize Pool */}
        {tournament.prize_pool && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              ${tournament.prize_pool}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-base font-bold leading-tight hover:text-blue-400 transition-colors cursor-pointer">
            {tournament.name || "Turnir nomi"}
          </h3>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {formatDate(tournament.start_date)} – {formatDate(tournament.end_date)}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between py-2 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="text-xs font-medium">{tournament.participants_count || 0}</span>
            </div>
            
            {tournament.max_participants && (
              <div className="text-xs text-gray-400">
                / {tournament.max_participants}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleJoin}
            disabled={isJoining || hasJoined}
            className={`transition-all duration-300 px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl ${
              hasJoined 
                ? 'bg-green-600 text-white cursor-not-allowed' 
                : isJoining 
                  ? 'bg-gray-600 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {hasJoined ? 'Qo\'shildingiz' : isJoining ? 'Yuklanmoqda...' : 'Qo\'shilish'}
          </motion.button>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{tournament.game?.name || tournament.category || 'O\'yin'}</span>
          <span>{tournament.entry_fee ? `$${tournament.entry_fee}` : 'Bepul'}</span>
        </div>

        {/* Description */}
        {tournament.description && (
          <div className="text-xs text-gray-400 line-clamp-2">
            {tournament.description}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TournamentCard;
