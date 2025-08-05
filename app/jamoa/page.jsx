import React from 'react'
import TeamCard from '../components/teamCard'

function page() {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen px-2 sm:px-4 lg:px-6 py-4 pt-16'>
      {/* Title Section */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 lg:mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
          Jamoa
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed opacity-90">
          Turnirdagi eng yaxshi jamoalar bilan tanishing
        </p>
      </div>

      {/* Teams Grid */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
        <TeamCard 
          teamName="Phoenix Squad"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={25}
          losses={5}
          rank={1}
          game="PUBG"
          isActive={true}
        />
        <TeamCard 
          teamName="Shadow Warriors"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={22}
          losses={8}
          rank={2}
          game="CS:GO"
          isActive={true}
        />
        <TeamCard 
          teamName="Cyber Hunters"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={20}
          losses={10}
          rank={3}
          game="Dota 2"
          isActive={false}
        />
        <TeamCard 
          teamName="Elite Force"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={18}
          losses={12}
          rank={4}
          game="PUBG"
          isActive={true}
        />
        <TeamCard 
          teamName="Storm Breakers"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={16}
          losses={14}
          rank={5}
          game="Clash Royale"
          isActive={true}
        />
        <TeamCard 
          teamName="Night Raiders"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={15}
          losses={15}
          rank={6}
          game="CS:GO"
          isActive={false}
        />
        <TeamCard 
          teamName="Fire Dragons"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={12}
          losses={18}
          rank={7}
          game="Dota 2"
          isActive={true}
        />
        <TeamCard 
          teamName="Ice Wolves"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={10}
          losses={20}
          rank={8}
          game="PUBG"
          isActive={false}
        />
        <TeamCard 
          teamName="Ice Wolves"
          teamLogo="/logo/logo-removebg-preview.png"
          wins={10}
          losses={20}
          rank={8}
          game="PUBG"
          isActive={false}
        />
      </div>
    </div>
  )
}

export default page