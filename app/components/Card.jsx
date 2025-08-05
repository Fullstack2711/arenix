"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Card = () => {
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
          src="/logo/logo.jpg"
          alt="Apex Legends"
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
            LIVE
          </span>
        </div>

        {/* Prize Pool */}
         
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-base font-bold leading-tight hover:text-blue-400 transition-colors cursor-pointer">
            Apex Championship
          </h3>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Jun 27 – Jun 29
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
              <span className="text-xs font-medium">64</span>
            </div>
            
             
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl"
          >
            Join
          </motion.button>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Xbox Gaming</span>
          <span>Free</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
