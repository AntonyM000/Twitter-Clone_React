import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { Link, useNavigate } from 'react-router-dom';


const PostsProfile = () => {
  const { userName, tweets } = useData();

  return (
    <>
      PostsProfile
      {tweets.map((tweet) => (
          
          <div key={tweet.id} className="flex flex-col flex-shrink-0 p-4 pb-0">
           
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
              
            </div>
          </div>
          
        ))}
      </>
  )
}

export default PostsProfile