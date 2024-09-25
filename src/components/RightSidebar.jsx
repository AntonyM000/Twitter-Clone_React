import { Avatar } from '@material-tailwind/react'
import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { CiSearch } from 'react-icons/ci'

const RightSidebar = () => {

  const forYou= [{'TrendingWhere':'Trending', 'content':'Stripe','PostsNumber':'4,377 posts'},{'TrendingWhere':'Business & Finance . Trending' , 'content':'S&P 500','PostsNumber':'4,555 posts'},{'TrendingWhere':'Trending in Kenya', 'content':'#NaneNaneMarch','PostsNumber':'4,486 posts'},{'TrendingWhere':'Technology . Trending', 'content':'Tailwind','PostsNumber':'1,430 posts'},{'TrendingWhere':'Sports . Trending' , 'content':'Kipyegon','PostsNumber':'23.7K posts'}]
  const likeArray= [{'ImageSrc':'https://static.vecteezy.com/system/resources/previews/010/161/888/original/hwc-triangle-letter-logo-design-with-triangle-shape-hwc-triangle-logo-design-monogram-hwc-triangle-logo-template-with-red-color-hwc-triangular-logo-simple-elegant-and-luxurious-logo-hwc-vector.jpg', 'Account':'TypeFace','AccName':'typefaceai'},{'ImageSrc':'https://th.bing.com/th/id/OIP.pPfRPGutuBSzNtxNCcUYcAHaHa?rs=1&pid=ImgDetMain', 'Account':'Asake Boro','AccName':'asake'},{'ImageSrc':'https://th.bing.com/th/id/OIP.f4WZS_Kl5tMcFDVJmKe30QAAAA?rs=1&pid=ImgDetMain', 'Account':'Paul Muite','AccName':'pmitu'}]

  return (
    <>
    <div className=' h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 hidden md:block'>
        <div className='container ml-2 relative flex'>
          <CiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600' size={24}/> 
          <input type="text" placeholder='Search' className='pl-10 bg-black border-2 m-2 border-white w-full h-10 rounded-2xl' />
          {/* <CiSettings className='my-auto  ' size={24} /> */}
        </div>

        <div className='rounded-lg ml-2 pb-1 bg-gray-50'>
          <h2 className='font-bold ml-2'>You might like</h2>
          {likeArray.map((bop,index)=>(
          <div key={index} className="m-2 flex w-full py-1">
            <img className="inline-block h-10 w-10 rounded-full" src={bop.ImageSrc} alt="" />
             <div className=''>
                <p className='font-bold text-sm'>{bop.Account}</p> 
                <p className='text-blue-gray-400 text-sm'>@{bop.AccName}</p>
             </div>
          <button className='bg-black font-semibold rounded-3xl ml-auto mr-3 mt-3 p-1 text-white'>Follow</button>

          </div>))}
          <h2 className='ml-2 text-blue-500'>Show more</h2>
        </div>

        <div className='w-full rounded-lg ml-2 p-2 mt-9 bg-gray-50 items-start flex flex-col' >
           <h3 className='font-extrabold text-lg'>Trends For You</h3>
           {forYou.map((item,index)=>(
          
          <div key={item.TrendingWhere} className='w-11/12 mb-3'>
             <p className="text-xs  font-medium text-gray-400 group-hover:text-gray-300 ">
              {item.TrendingWhere} </p>
            <h2 className='font-semibold text-base'>{item.content}</h2>
            <p className="text-sm text-gray-400 group-hover:text-gray-300">
              {item.PostsNumber} </p>
              <BiDotsHorizontalRounded size={24} className=' absolute right-11  -translate-y-10' />
          </div>
          ))}

        </div>
    </div>
    </>
  )
}

export default RightSidebar