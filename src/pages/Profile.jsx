import { Avatar } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Link, NavLink, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import { MdOutlineMail } from "react-icons/md";
import { IoBagHandleOutline, IoBalloonOutline } from 'react-icons/io5';
import { RiMapPinLine } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import PostsProfile from '../components/PostsProfile';
import RepliesProfile from '../components/RepliesProfile';
import MediaProfile from '../components/MediaProfile';
import HighlightsProfile from '../components/HighlightsProfile';
import { collection, getFirestore, query } from 'firebase/firestore';
import { app } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const db= getFirestore(app)
  const profileClass= ({isActive})=>(isActive? 'font-bold border-b-3 border-blue-300 text-black':'text-gray-400')
  const auth= getAuth();
  
  // useEffect(()=>{
  //   const fetchData= async ()=>{
  //     onAuthStateChanged(auth, async (user) =>{}
  //   if (user){
  //     const uid=user.uid;

  //     try{
  //       const Users= query(collection(db,"users"))
  //       const querySnapshot
  //     }
  //   })
  //   }
  // })
  return (
    <div className='w-full'>
      <header>
        <h2 className='ml-1 font-bold'>Stas UserName</h2>
        <p className='ml-2 text-sm text-gray-500'> 32 Posts</p>
      </header>

      <div className='w-full h-48 bg-center bg-no-repeat bg-fixed bg-[url("/hat.jpg")]'>
        <img className='float-left mt-24 ml-2 rounded-full  w-20 h-20' src="/pexels-alex-andrews-271121-821736.jpg" alt="" />
      </div>

      <div className='w-full'>
        <div className='flex text-end float-right'>
          <button className=''><BiDotsHorizontalRounded size={24}/></button>
          <button><MdOutlineMail className='border-2 p-0.5 mx-1 border-black rounded-full' size={32}/></button>
          <button className='bg-black rounded-xl mr-2 mt-1 p-1 text-white'>Follow</button>
        </div>

        <h2 className='font-bold mt-7'>UserName</h2>
        <p className='text-gray-400 text-sm'>@Nesprokin</p>

        <p className='mt-6 ml-1 text-sm '>Designing Products that Users Love</p>
        <div className="icons flex flex-wrap ml-2 mt-1 mb-1 space-x-3">
          <p className="text-gray-400 flex text-sm"><IoBagHandleOutline />Entrepreneur</p>
          <p className="text-gray-400 flex text-sm"><RiMapPinLine />Earth</p>
          <Link className="text-blue-300 flex text-sm"><IoMdLink className='text-gray-400'/>neprokin.com</Link>
          <p className="text-gray-400 flex text-sm"><IoBalloonOutline />Born November 7, 1987</p>
          <p className="text-gray-400 flex text-sm"><HiOutlineCalendarDays />Joined November 2010</p>
        </div>

        <div className='flex space-x-2'>    
          <p className='text-blue-gray-100 '><label className='font-bold text-black'>143</label> Following</p>
          <p className='text-blue-gray-100 '><label className='font-bold text-black'>149</label> Followers</p>
        </div>
        
        <div className='w-full flex border-b-4 border-gray-400 justify-evenly items-center '>
          <NavLink className={profileClass} to={'/profile/'}>Posts</NavLink>
          <NavLink className={profileClass} to={'replies'}>Replies</NavLink>
          <NavLink className={profileClass} to={'highlights'}>Highlights</NavLink>
          <NavLink className={profileClass} to={'media'}>Media</NavLink>
        </div>
      </div>
      
      <Outlet/>
    
      {/* <Outlet/> */}
    </div>
  )
}

export default Profile