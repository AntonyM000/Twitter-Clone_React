import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useAuth } from '../hooks/useAuth';

const Message = () => {
  const {currentUser} =useAuth();
  // useEffect(()=>(
  //   console.log(currentUser)
  // ))[currentUser]
  // const arrayt={TweetMediaArray}
  return (
    <div>
      log Messages
      {currentUser?.uid}
    </div>
  )
}

export default Message