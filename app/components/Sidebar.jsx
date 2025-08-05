"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 1,
      title: 'Yangiliklar',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Turnirlar',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Reyting',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11zm4-2h2v12h-2V9z"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "O'yinlar",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M20,16H4V8H20V16M6,15A1,1 0 0,0 7,14A1,1 0 0,0 6,13A1,1 0 0,0 5,14A1,1 0 0,0 6,15M8,13A1,1 0 0,0 9,12A1,1 0 0,0 8,11A1,1 0 0,0 7,12A1,1 0 0,0 8,13M16,15A1,1 0 0,0 17,14A1,1 0 0,0 16,13A1,1 0 0,0 15,14A1,1 0 0,0 16,15M18,13A1,1 0 0,0 19,12A1,1 0 0,0 18,11A1,1 0 0,0 17,12A1,1 0 0,0 18,13Z"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "O'yinchilar",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3.72 5.02L8.5 12.5a1.5 1.5 0 0 0-2.12 0l-2 2A1.5 1.5 0 0 0 4.38 16.5L6.5 14.38l1.5 1.5L9.5 17.5 8 20h2l1.5-2.5L13 20h2l-1.5-2.5z"/>
        </svg>
      )
    }
  ];

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="  left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col  "
    >
      {/* Menu Items */}
      <nav className="flex-1 px-4 py-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 group"
              >
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium">{item.title}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* PRO Account Section */}
      <div className="p-4 border-t border-gray-800 relative top-4 sm:top-8 lg:top-24">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-0.5 rounded-xl"
        >
          <div className="bg-gray-900 rounded-xl p-4 text-center ">
            {/* Lightning Icon */}
            <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-purple-500 to-orange-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2v11h3v9l7-12h-4L17 2H7z"/>
              </svg>
            </div>
            
            <h3 className="text-white font-semibold text-lg mb-1">PRO Hisob</h3>
            <p className="text-gray-400 text-sm mb-4">Barcha imkoniyatlarni oching</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
            >
              PRO bo'ling
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
