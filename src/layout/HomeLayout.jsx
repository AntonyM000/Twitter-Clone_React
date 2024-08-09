import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../hooks/useAuth'
import RightSidebar from '../components/RightSidebar'

const HomeLayout = () => {
  const {signout}=useAuth()
  return (
    <div className='flex'>
    <Sidebar />
    <Outlet />
    <RightSidebar/>
    </div>
  )
}

export default HomeLayout