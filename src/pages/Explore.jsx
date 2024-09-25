import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import { collection, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { CiCircleChevRight, CiSearch, CiSettings } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Emoji from '../components/EmojiPicker';

const Explore = () => {
  const db= getFirestore(app)
  // const [userID, setUserID]=useState('')
  const [userArray, setUserArray]=useState([])
  const [userJina, setUserJina]=useState('')

  const auth= getAuth();
  useEffect(()=>{
    const fetchData= async ()=>{
    onAuthStateChanged(auth, async (user) =>{
      if (user){
        const uid=user.uid;
        // setUserID(uid)
        try{

          const Users= query(collection(db,"users"))
          const querySnapshot = await getDocs(Users)
          
          const usersList = querySnapshot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
          }))
          setUserArray(usersList)
          // console.log(usersList)
          // console.log(usersList.find((user)=>user.id === uid))
          const currentUser=usersList.find((user)=>user.id === uid)
          // console.log(currentUser.userName)
          setUserJina(currentUser.userName)
          // console.log(userJina)
          // if(currentUser)
          //   {
          //     setUserJina(currentUser.userName);
          //   }
        }catch(error){console.error('Error:'+error)}
          
      }else{
        console.log('user is signed out')
      }
    })
  }; 
    fetchData();
  },[auth,db])
  
  
  const forYou= [{'TrendingWhere':'Trending in Luxembourg', 'content':'#Energy','PostsNumber':'412K'},{'TrendingWhere':'Business $ Finance', 'content':'Interest Rates','PostsNumber':'502K'},{'TrendingWhere':'Trending', 'content':'#TogetherMarch','PostsNumber':'1020'},{'TrendingWhere':'Trending ', 'content':'Architecture Firm','PostsNumber':'500'}]
  return (
  <>
  <div className='flex w-full text-white bg-black flex-col'>

        <div className='container relative flex'>
          <CiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600' size={24}/> 
          <input type="text" placeholder='Search' className='pl-10 bg-black border-2 m-2 border-white w-full h-10 rounded-2xl' />
          <CiSettings className='my-auto  ' size={24} />
        </div>

        <div className='w-full flex justify-evenly items-center '>
          <NavLink>For you</NavLink>
          <NavLink>Trending</NavLink>
          <NavLink>News</NavLink>
          {/* <NavLink>Sports</NavLink>
          <NavLink>Entertainment</NavLink> */}
        </div>

        <NavLink className="bg-center justify-evenly items-center flex flex-col bg-cover mb-2 bg-blue-400 bg-no-repeat" >
          <p className='font-bold mr-1'>PARIS 2024</p>
          <p>Follow the action</p>
          <CiCircleChevRight className='float-left ' />
        </NavLink>

        <div className='w-full ml-3 mt-9 items-start flex flex-col' >
           <h3 className='font-bold mb-3'>For You</h3>
           {forYou.map((item,index)=>(
          
          <div className='w-11/12'>
             <p className="text-xs leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
              {item.TrendingWhere} </p>
            <h2 className='font-semibold text-lg'>{item.content}</h2>
            <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
              {item.PostsNumber} </p>
              <BiDotsHorizontalRounded size={24} className='mb-auto ml-auto' />
          </div>
          ))}

        </div>
      
        <div>
          <label><video src="2054085-hd_1280_720_30fps.mp4"  controls className='w-10/12  mx-auto max-w-[26rem] rounded-xl border-1 border-white mb-4'></video>From:Yeyeye</label>
        </div>
  </div>
  {/* <button  className='bg-red-300 p-2 h-10 rounded m-12'>Count </button>
       <div className='bg-blue-gray-600 p-2 h-10 rounded m-2'>count</div>
    <h3 className='bg-green-200 h-20 font-serif'>{userJina} is the current user</h3> */}
  </>
  )
}

export default Explore