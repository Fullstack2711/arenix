"use client";

import Image from "next/image";
import { useState } from "react";

const LeftSidebar = () => {
  const [selectedTime, setSelectedTime] = useState("This week");
  const [selectedRegion, setSelectedRegion] = useState("Global");
  const [selectedFormat, setSelectedFormat] = useState("Any format");

  const games = [
    { name: "Clash Royale", icon: "/game/clash.jpg" },
    { name: "League of Legends", icon: "/game/clash.jpg" },
    { name: "Gwent", icon: "/game/clash.jpg" },
    { name: "Call of Duty", icon: "/game/clash.jpg" },
    { name: "PUBG", icon: "/game/clash.jpg" },
    { name: "Overwatch", icon: "/game/clash.jpg" },
 
   ];

  const platforms = [
    { name: "PlayStation", icon: "/game/xbox.png" },
    { name: "Xbox", icon: "/game/xbox.png" },
   ];

  return (
    <div className="w-full h-full bg-gray-800 text-white p-3 lg:p-8 overflow-y-auto rounded-xl">
      {/* Filter Section */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Filter by</h2>
        
        {/* Time Filter */}
        <div className="mb-4">
          <select 
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="This week">This week</option>
            <option value="This month">This month</option>
            <option value="This year">This year</option>
            <option value="All time">All time</option>
          </select>
        </div>

        {/* Region Filter */}
        <div className="mb-4">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="Global">Global</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="South America">South America</option>
          </select>
        </div>

        {/* Format Filter */}
        <div className="mb-6">
          <select 
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="Any format">Any format</option>
            <option value="Tournament">Tournament</option>
            <option value="League">League</option>
            <option value="Battle Royale">Battle Royale</option>
            <option value="1v1">1v1</option>
            <option value="Team">Team</option>
          </select>
        </div>
      </div>

      {/* Games Section */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Games</h2>
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          {games.map((game, index) => (
            <div 
              key={index}
              className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 lg:p-4 cursor-pointer transition-all duration-200 hover:scale-105 group flex items-center justify-center h-16 lg:h-20"
            >
              <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center">
                <img 
                  src={game.icon} 
                  alt={game.name}
                  className="w-full h-full object-contain rounded-lg group-hover:brightness-110 transition-all duration-200"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platforms Section */}
      <div>
        <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Platforms</h2>
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 lg:p-4 cursor-pointer transition-all duration-200 hover:scale-105 group flex items-center justify-center h-16 lg:h-20"
            >
              <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center">
                <img 
                  src={platform.icon} 
                  alt={platform.name}
                  className="w-full h-full object-contain rounded-lg group-hover:brightness-110 transition-all duration-200"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
