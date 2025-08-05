import React from 'react'
import Sidebar from './Sidebar'
import LeftSidebar from './leftSidebar'
import TournamentsCard from './TournamentsCard'
import Card from './Card'

function DashboardSection() {
  return (
    <div className="px-2 sm:px-4 lg:px-6 py-4">
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