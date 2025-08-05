import React from 'react'
import Image from 'next/image'

function TeamCard({ 
  teamName = "Team Name", 
  teamLogo = "/logo/logo-removebg-preview.png", 
  members = [], 
  wins = 0, 
  losses = 0, 
  rank = 1,
  game = "PUBG",
  isActive = true 
}) {
  const winRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  return (
    <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group w-full max-w-lg h-48">
      {/* Active Status Indicator */}
      {isActive && (
        <div className="absolute top-3 right-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Rank Badge */}
      <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
        #{rank}
      </div>

      {/* Main Content - Horizontal Layout */}
      <div className="flex items-center gap-4 h-full pt-6">
        {/* Team Logo */}
        <div className="flex-shrink-0">
          <Image 
            src={teamLogo}
            alt={teamName}
            width={60}
            height={60}
            className="w-15 h-15 rounded-full border-3 border-blue-500/50 group-hover:border-blue-400 transition-all duration-300"
          />
        </div>

        {/* Team Info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{teamName}</h3>
          <p className="text-gray-400 text-xs mb-2">{game}</p>
          
          {/* Stats in one row */}
          <div className="flex gap-4 mb-2">
            <div className="text-center">
              <p className="text-lg font-bold text-green-400">{wins}</p>
              <p className="text-gray-400 text-xs">Wins</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-red-400">{losses}</p>
              <p className="text-gray-400 text-xs">Loss</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-400">{winRate}%</p>
              <p className="text-gray-400 text-xs">Rate</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm">
            Ko'rish
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamCard