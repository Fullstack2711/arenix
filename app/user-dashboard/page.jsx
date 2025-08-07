'use client'
import React, { useState } from 'react'
import UserNavbar from '../components/userNavbar'
import UserSidebar from '../components/userSidebar'
import DashboardContent from '../components/DashboardContent'

function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserNavbar />
        <main className="flex-1 overflow-y-auto">
          <DashboardContent activeTab={activeTab} />
        </main>
      </div>
    </div>
  )
}

export default UserDashboardPage