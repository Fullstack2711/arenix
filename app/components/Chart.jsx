import React from "react";

const Chart = () => {
  return (
    <div>
      {/* Chart Title */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-12 mt-24 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
          Analitika Markazi
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed">
          O'yin natijalaringizni kuzating va taraqqiyotingizni tahlil qiling
        </p>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 lg:p-8 xl:p-12 mx-2 sm:mx-4 lg:mx-8 xl:mx-16 mt-6 sm:mt-8 lg:mt-12 xl:mt-16 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 text-white rounded-2xl sm:rounded-3xl overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 max-w-full lg:max-w-lg z-10 text-center lg:text-left mb-8 lg:mb-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">
          Avtomatik
          <br />
          natijalarni
          <br />
          kuzatish
        </h1>
        
        <p className="text-xs sm:text-sm lg:text-base xl:text-lg mb-4 sm:mb-6 lg:mb-8 opacity-90 leading-relaxed max-w-full lg:max-w-md mx-auto lg:mx-0">
          Hech qanday yuklanish, hech qanday o'rnatish, hech qanday muammo. 
          O'yin hisobingizni ulashgandan so'ng, hammasi tayyor. Turnirlarga 
          qo'shiling, kerakli o'yin rejimlarida o'ynang, biz qolgan hamma 
          narsani avtomatik ravishda kuzatamiz.
        </p>
        
        <button className="bg-white text-blue-600 font-semibold py-2 px-4 sm:py-3 sm:px-6 lg:py-4 lg:px-8 text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Hozir qo'shiling
        </button>
      </div>

      {/* Right Side - 3D Chart Dashboard */}
      <div className="relative flex-1 w-full lg:max-w-lg h-64 sm:h-80 lg:h-96 xl:h-[450px] lg:ml-8">
        {/* Main Dashboard Container */}
        <div className="absolute right-0 top-0 w-full h-full bg-white/95 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-2xl transform rotate-1 sm:rotate-2 lg:rotate-3 hover:rotate-0 sm:hover:rotate-1 lg:hover:rotate-1 transition-transform duration-500">
          {/* Dashboard Header */}
          <div className="p-2 sm:p-3 lg:p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex space-x-1 sm:space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">D</span>
                </div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Area */}
          <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-gray-100 p-2 sm:p-3 rounded-md lg:rounded-lg">
                <div className="w-full h-1.5 sm:h-2 bg-gray-300 rounded mb-1 sm:mb-2"></div>
                <div className="w-3/4 h-1.5 sm:h-2 bg-gray-300 rounded"></div>
              </div>
              <div className="bg-gray-100 p-2 sm:p-3 rounded-md lg:rounded-lg">
                <div className="w-full h-1.5 sm:h-2 bg-gray-300 rounded mb-1 sm:mb-2"></div>
                <div className="w-2/3 h-1.5 sm:h-2 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Main Chart Area */}
            <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg xl:rounded-xl p-2 sm:p-3 lg:p-4 overflow-hidden">
              {/* Pink/Red Chart Line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180">
                <defs>
                  <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#ff6b9d', stopOpacity:0.3}} />
                    <stop offset="100%" style={{stopColor:'#ff6b9d', stopOpacity:0.05}} />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 120 Q 60 100 100 80 T 180 60 T 250 40 L 250 160 L 20 160 Z"
                  fill="url(#pinkGradient)"
                />
                <path
                  d="M 20 120 Q 60 100 100 80 T 180 60 T 250 40"
                  stroke="#ff6b9d"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Data points */}
                <circle cx="20" cy="120" r="4" fill="#ff6b9d" />
                <circle cx="100" cy="80" r="4" fill="#ff6b9d" />
                <circle cx="180" cy="60" r="4" fill="#ff6b9d" />
                <circle cx="250" cy="40" r="4" fill="#ff6b9d" />
              </svg>

              {/* Blue Chart Line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180">
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#4f46e5', stopOpacity:0.2}} />
                    <stop offset="100%" style={{stopColor:'#4f46e5', stopOpacity:0.05}} />
                  </linearGradient>
                </defs>
                <path
                  d="M 30 140 Q 70 130 110 110 T 190 100 T 260 120 L 260 160 L 30 160 Z"
                  fill="url(#blueGradient)"
                />
                <path
                  d="M 30 140 Q 70 130 110 110 T 190 100 T 260 120"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Data points */}
                <circle cx="30" cy="140" r="4" fill="#4f46e5" />
                <circle cx="110" cy="110" r="4" fill="#4f46e5" />
                <circle cx="190" cy="100" r="4" fill="#4f46e5" />
                <circle cx="260" cy="120" r="4" fill="#4f46e5" />
              </svg>

              {/* Green Chart Line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180">
                <path
                  d="M 40 150 Q 80 145 120 140 T 200 135 T 270 130"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Data points */}
                <circle cx="40" cy="150" r="4" fill="#10b981" />
                <circle cx="120" cy="140" r="4" fill="#10b981" />
                <circle cx="200" cy="135" r="4" fill="#10b981" />
                <circle cx="270" cy="130" r="4" fill="#10b981" />
              </svg>
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-gray-100 p-1.5 sm:p-2 rounded">
                <div className="w-full h-1 sm:h-1.5 bg-gray-300 rounded"></div>
              </div>
              <div className="bg-gray-100 p-1.5 sm:p-2 rounded">
                <div className="w-4/5 h-1 sm:h-1.5 bg-gray-300 rounded"></div>
              </div>
              <div className="bg-gray-100 p-1.5 sm:p-2 rounded">
                <div className="w-3/4 h-1 sm:h-1.5 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Chart Image */}
        <div className="absolute -right-4 sm:-right-6 lg:-right-8 -top-2 sm:-top-3 lg:-top-4 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 z-20">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/046/902/526/small_2x/growth-business-chart-3d-concept-free-png.png"
            alt="3D Chart"
            className="w-full h-full object-contain drop-shadow-xl lg:drop-shadow-2xl transform rotate-6 sm:rotate-8 lg:rotate-12 hover:rotate-3 sm:hover:rotate-4 lg:hover:rotate-6 transition-transform duration-500 filter brightness-110 sm:brightness-125 contrast-110 sm:contrast-125 saturate-105 sm:saturate-110"
            style={{
              filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)) brightness(1.2) contrast(1.1) saturate(1.05) sm:drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6)) sm:drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4)) sm:brightness(1.3) sm:contrast(1.2) sm:saturate(1.1)'
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-2 sm:top-3 lg:top-4 right-8 sm:right-10 lg:right-12 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 -right-2 sm:-right-3 lg:-right-4 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-pink-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 -right-1 sm:-right-1.5 lg:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-ping delay-500"></div>
      </div>
    </div>
    </div>
  );
};

export default Chart;
