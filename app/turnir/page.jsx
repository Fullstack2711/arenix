"use client";
import React, { useState } from 'react';
import { CardSpotlightDemo } from '../components/CardApple';

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('all');

  // O'yinlar ro'yxati
  const games = [
    { img: "/turnir/blood.png", name: "Clash Royale", devices: ["mobile"] },
    { img: "/turnir/pubg_turnir.png", name: "PUBG", devices: ["mobile", "pc"] },
    { img: "/turnir/cs.png", name: "CS:GO", devices: ["pc"] },
    { img: "/turnir/dota.png", name: "Dota 2", devices: ["pc"] },
    { img: "/turnir/cr7.png", name: "FIFA", devices: ["ps"] }, // PlayStation o'yini
        { img: "/turnir/pubg_turnir.png", name: "PUBG", devices: ["mobile", "pc"] },
    { img: "/turnir/cs.png", name: "CS:GO", devices: ["pc"] },
    { img: "/turnir/dota.png", name: "Dota 2", devices: ["pc"] },
     
  ];

  // Qurilmalar ro'yxatini o'yinlardan avtomatik olish
  const uniqueDevices = Array.from(
    new Set(games.flatMap(game => game.devices))
  );

  const deviceOptions = ['all', ...uniqueDevices];

  // Filtrlash
  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDevice = selectedDevice === 'all' || game.devices.includes(selectedDevice);
    return matchesSearch && matchesDevice;
  });

  return (
    <div className='px-2 sm:px-4 lg:px-6 py-4 m-auto bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen pt-16'>
      {/* Title */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
          Turnirlar
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed opacity-90">
          O'yinlaringizni tanlang va turnirda qatnashing
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-46">
        <div className="flex justify-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="O'yin nomini qidiring..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
          </div>

          {/* Filter - Dropdown Select */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="pl-12 pr-10 py-4 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-gray-800 cursor-pointer appearance-none transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
            >
              {deviceOptions.map(device => (
                <option key={device} value={device} className="bg-gray-800 text-white py-2">
                  {device === "all" ? "🎮 Hammasi" :
                   device === "pc" ? "💻 PC" :
                   device === "mobile" ? "📱 Mobile" :
                   device === "ps" ? "🎮 PlayStation" :
                   device.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className='flex justify-center items-center gap-6 gap-y-17 flex-wrap border-2 border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 bg-gray-900'>
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <CardSpotlightDemo
              key={index}
              img={game.img}
              name={game.name}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">Hech qanday o'yin topilmadi</p>
            <p className="text-gray-500 text-sm mt-2">Qidiruv shartlarini o'zgartiring</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
