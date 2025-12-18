import React, { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import ExampleNavbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/sidebar'

const AdminLayout: React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), [])

  return (
    <>
      <ExampleNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className={`flex-1 p-6 mt-16 bg-gray-100  min-h-screen rounded-tl-lg transition-all duration-200 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>  <Outlet /></main>
      </div>
    </>
  )
}

export default AdminLayout
