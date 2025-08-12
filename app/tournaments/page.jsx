'use client'
import { getAccessToken } from '../../lib/auth';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
 

function Page() {
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://3eb989695206.ngrok-free.app/api';
  const access_token = getAccessToken();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (!access_token) return;
    const getLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/tournaments/leaderboard/`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${access_token}`,
          },
        });
        setLeaderboard(response.data);
        console.log('Leaderboard data:', response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    getLeaderboard();
  }, [access_token, API_URL]);

  if (!access_token) {
    return <div className="text-red-500">Login qiling</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-4">Leaderboard</h1>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Score</th>  
              <th className="px-4 py-2">Games Played</th>
              <th className="px-4 py-2">Wins</th>
              <th className="px-4 py-2">Losses</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={index} className={`bg-${index % 2 === 0 ? 'gray' : 'white'} hover:bg-blue-700`}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{player.name}</td>
                <td className="border px-4 py-2">{player.score}</td>
                <td className="border px-4 py-2">{player.games_played}</td>
                <td className="border
  px-4 py-2">{player.wins}</td>
                <td className="border px-4 py-2">{player.losses}</td>
              </tr>    
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page