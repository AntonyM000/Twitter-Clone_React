import React from 'react'
import { CiHome,  CiSearch } from 'react-icons/ci'
import { IoMdMail } from "react-icons/io";
import { IoPersonOutline } from 'react-icons/io5';
import { NavLink, useLocation } from 'react-router-dom';


const BottomSidebar = () => {
    const activetab=({isActive})=>(isActive ? 'text-blue-400 px-1 py-1   font-medium rounded-full hover:bg-blue-800 hover:text-blue-300':'hover:bg-blue-800 hover:text-blue-300')
    const location=useLocation()
    const bgColour= location.pathname == "/explore" ? 'bg-black' :'bg-white'
  return (
    <div className={`w-full  pt-1 flex  fixed bottom-0   md:hidden justify-evenly ${bgColour}`}>
        <NavLink className={activetab} to={'/'}> <CiHome  size={24}/></NavLink>
        <NavLink className={activetab} to={'/explore'} > <CiSearch size={24}/></NavLink>
        <NavLink className={activetab} to={'/profile'} > <IoPersonOutline size={24}/></NavLink>
        <NavLink className={activetab} to={'/message'} > <IoMdMail  size={24} /></NavLink>

    </div>
  )
}

export default BottomSidebar