import React from 'react';
import { useData } from '../hooks/useData';
import { Link } from 'react-router-dom';

const MediaProfile = () => {
  const { tweets } = useData();
  const mediaTweets = tweets.filter(tweet => tweet.imageUrl);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {mediaTweets.map((tweet) => (
        <div key={tweet.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Link to="#" className="group block">
          
            <img
              className="rounded-lg w-full h-auto"
              src={tweet.imageUrl}
              alt="Tweet Media"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MediaProfile;
