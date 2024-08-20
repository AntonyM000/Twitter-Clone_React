import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { Link, useNavigate } from 'react-router-dom';
import { where } from 'firebase/firestore';
import { HiMiniArrowsUpDown, HiOutlineChartBar } from 'react-icons/hi2';
import { BiMessageRoundedDots, BiSolidBarChartAlt2 } from 'react-icons/bi';
import { CiHeart } from 'react-icons/ci';
import { IoDownloadOutline } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';


const PostsProfile = () => {
  const { userName, tweets } = useData();
  // const profiletweets= tweets where {tweets.userName}==={userName} 
  const profileTweets = tweets.filter(tweet => tweet.userName === userName);


  return (
    <>
       {profileTweets.map((tweet) => (
          
          <div key={tweet.id} className="flex max-w-2xl mx-auto flex-col flex-shrink-0 p-4 pb-0">
           
            <Link to="#" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <img className="inline-block h-10 w-10 rounded-full" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="" />
                </div>
                <div className="ml-3 flex flex-col ">
        
                  <p className="text-base leading-6 font-medium text-black">
                     {tweet.userName}</p>
                    <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @{tweet.userName} .  {new Date(tweet?.createdAt.toDate()).toLocaleDateString()}
        
                    </span>
                  
                </div>
              </div>
            </Link>
            <div className="pl-16 bg-blue-gray-100 rounded flex flex-col">
              <p className="text-base width-auto font-medium text-black flex-shrink">
                {tweet.content}
              </p>
              {tweet.imageUrl && (
                <div className="md:flex-shrink pr-6 pt-3">
                  <img
                    className="rounded-lg w-full h-64"
                    src={tweet.imageUrl}
                    alt="Tweet Media"
                  />
                </div>
              )}
              <div className="flex">
        <div className="w-full">
          <div className="flex  items-center">
            <div className="flex-1 gap-2 text-center">
            <BiMessageRoundedDots className=" flex items-center text-gray-500  hover:bg-blue-800 hover:text-blue-300" size={24}/>
              {/* <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </Link> */}
            </div>
            <div className="flex-1 text-center py-2 m-2">
            <HiMiniArrowsUpDown className=" flex items-center text-gray-500  hover:bg-blue-800 hover:text-blue-300" size={24}/>
              {/* <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                </svg>
              </Link> */}
            </div>
            <div className="flex-1 text-center py-2 m-2">
            <CiHeart className=" flex items-center text-gray-500  hover:bg-blue-800 hover:text-blue-300" size={24}/>
              {/* <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </Link> */}
            </div>
            <div className="flex-1 text-center py-2 m-2">
            <MdOutlineFileUpload className=" flex items-center text-gray-500  hover:bg-blue-800 hover:text-blue-300" size={24}/>
              {/* <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
              </Link> */}
            </div>
            <div className="flex-1 text-center py-2 m-2">
            <IoDownloadOutline className=" flex items-center text-gray-500  hover:bg-blue-800 hover:text-blue-300" size={24}/>
              {/* <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path>
                </svg>
              </Link> */}
            </div>
            <div className="flex-1 text-center py-2 m-2">
            <HiOutlineChartBar className=" flex items-center text-gray-500  hover:bg-blue-800 hover:text-blue-300" size={24}/>
              {/* <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
              
            </div>
          </div>
          
        ))}
      </>
  )
}

export default PostsProfile