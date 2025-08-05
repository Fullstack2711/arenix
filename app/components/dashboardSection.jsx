import React from 'react'
import Sidebar from './Sidebar'
import LeftSidebar from './leftSidebar'
import TournamentsCard from './TournamentsCard'
import Card from './Card'

function DashboardSection() {
  return (
    <div className="px-2 sm:px-4 lg:px-6 py-4 m-auto">
        {/* Dashboard Title */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Yangi Turnirlar
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Turnirlarga qatnashing, o'yin natijalaringizni kuzating va yangi imkoniyatlarni kashf eting
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row bg-gray-900 text-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-2xl max-w-7xl mx-auto border-2 border-gray-700 hover:border-gray-600 transition-colors duration-300">
            <div className="w-full lg:w-64 flex-shrink-0 mb-4 lg:mb-0">
              <Sidebar />
            </div>
           <div className='flex flex-col gap-4 lg:gap-6 flex-1 lg:mx-6'>
             <TournamentsCard />
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6'>
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
           </div>
            <div className="w-full lg:w-64 flex-shrink-0 mt-4 lg:mt-0">
              <LeftSidebar />
            </div>
            </div>
    </div>
  )
}

export default DashboardSection