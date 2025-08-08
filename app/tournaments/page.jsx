'use client';
import { getAccessToken } from '../../lib/auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Page() {
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://3eb989695206.ngrok-free.app/api';
  const [leaderboard, setLeaderboard] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1️⃣ Token olish
    const token = getAccessToken();
    setAccessToken(token);

    // Agar token bo'lmasa, to'xtatamiz
    if (!token) {
      setLoading(false);
      return;
    }

    // 2️⃣ API chaqirish
    const getLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/tournaments/leaderboard/`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'Authorization': `Bearer ${token}`,
          },
        });
        setLeaderboard(response.data);
      } catch (err) {
        setError('Leaderboardni yuklashda xatolik yuz berdi');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    getLeaderboard();
  }, [API_URL]);

  if (!accessToken) {
    return <div className="text-red-500 p-4">Login qiling</div>;
  }

  if (loading) {
    return <div className="text-white p-4">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-4">Leaderboard</h1>
        <table className="w-full table-auto text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 border border-gray-700">Rank</th>
              <th className="px-4 py-2 border border-gray-700">Name</th>
              <th className="px-4 py-2 border border-gray-700">Score</th>
              <th className="px-4 py-2 border border-gray-700">Games Played</th>
              <th className="px-4 py-2 border border-gray-700">Wins</th>
              <th className="px-4 py-2 border border-gray-700">Losses</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-blue-700`}
              >
                <td className="border border-gray-700 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-700 px-4 py-2">{player.name || player.username || 'No Name'}</td>
                <td className="border border-gray-700 px-4 py-2">{player.score}</td>
                <td className="border border-gray-700 px-4 py-2">{player.games_played}</td>
                <td className="border border-gray-700 px-4 py-2">{player.wins}</td>
                <td className="border border-gray-700 px-4 py-2">{player.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
