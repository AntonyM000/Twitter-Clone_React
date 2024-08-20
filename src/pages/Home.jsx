import { Avatar } from '@material-tailwind/react';
import { doc, getFirestore, setDoc, onSnapshot, query, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { IoImagesOutline } from 'react-icons/io5';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import Emoji from '../components/EmojiPicker';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [tweetContent, setTweetContent] = useState('');
  const [emojiShow, setEmojiShow] = useState(false);

  const db = getFirestore(app);
  const storage = getStorage(app);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { userName, tweets } = useData();
  // const auth = getAuth();
  // const uid = auth.currentUser?.uid
  // const {currentUser} =useAuth();
  // const {userName} =useData();
  // const {tweets}=useData()


  // useEffect(() => {
  //   const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
  //     // const unsubscribeAuth = ()=>
  //     if (!currentUser) {
  //       navigate("/login");
  //     } else {
  //       const userDocRef = doc(db, "users", uid);

  //       // Fetch the user's username from the database
  //       // const unsubscribeUsername = onSnapshot(userDocRef, (docSnap) => {
  //       //   if (docSnap.exists) {
  //       //     const userData = docSnap.data();
  //       //     setUserName(userData.userName);
  //       //   }
  //       // });

  //       // const tweetsQuery = query(collection(db, 'tweets'));
  //       // const unsubscribeTweets = onSnapshot(tweetsQuery, (snapshot) => {
  //       //   const tweetsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //       //   setTweets(tweetsData);
  //       // });

  //       return () => {
  //         unsubscribeUsername();
  //         unsubscribeTweets();
  //       };
  //     }
  //   });

  //   return () => {
  //     unsubscribeAuth();
  //   };
  // }, [db, currentUser, navigate]);

  const emojihandleclick = () => {
    setEmojiShow(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const uploadFile = async (file) => {
    const storageRef = ref(storage, 'uploads/' + file.name);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  const tweetFunction = async () => {
    // const user = auth.currentUser; // Get the current user directly from Firebase
   console.log('uploading')

    if (!tweetContent) {
      alert('Please enter some content to tweet');
      return;
    }

    let imageUrl = '';
    if (file) {
      imageUrl = await uploadFile(file);
    }

    try {
      await setDoc(doc(db, 'tweets', `${currentUser.uid}-${Date.now()}`), {
        content: tweetContent,
        imageUrl,
        userId: currentUser.uid,
        userName: userName,
        createdAt: new Date(),
      });
      setTweetContent('');
      setFile(null);
      setImageSrc('');
      console.log('Tweet added successfully')
    } catch (error) {
      console.error('Error adding tweet: ', error);
    }
  };


  return (
    <>
      <div className="w-3/5 border border-gray-600 h-auto border-t-0">
                 {/* middle wall */}

                  <div className="flex">
                     <div className="flex-1 m-2">
                         <h2 className="px-4 py-2 text-xl font-semibold text-black">Home</h2>
                     </div>
                     <div className="flex-1 px-4 py-2 m-2">
                         <Link to="" className=" text-2xl font-medium rounded-full text-black hover:bg-blue-800 hover:text-blue-300 float-right">
                             <svg className="m-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><g><path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path></g>
                             </svg>
                         </Link>
                     </div>
                 </div>

                 <hr className="border-gray-600"/>

                                  {/* middle creat tweet */}
        {/* Tweet Creation */}
        <div className="flex">
          <div className="m-2 w-10 py-1">
            <img className="inline-block h-10 w-10 rounded-full" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="" />
          </div>
          <div className="flex-1 px-2 pt-2 mt-2">
            <textarea
              className="bg-transparent text-gray-400 font-medium text-lg w-full"
              rows="2"
              cols="50"
              placeholder="What's happening?"
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
            ></textarea>
            {imageSrc && <img src={imageSrc} className="max-w-60 rounded" alt="" />}
          </div>
        </div>

                         {/* middle creat tweet below icons */}
        <div className="flex">
          <div className="w-64 px-2">
            <div className="flex items-center">
                           {/* image upload */}

              <input
                type="file"
                className="invisible"
                id="imageupload"
                onChange={handleFileChange}
              />
              <div className="flex-1 -ml-72 text-center px-1 py-1 m-2">

                <label
                  htmlFor="imageupload"
                  className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                  >
                  <IoImagesOutline />
                </label>
                </div>
                {emojiShow && <Emoji onAddEmoji={setTweetContent}/>}
                 {/* video upload */}
                             <div className="flex-1 text-center py-2 m-2">
                                 <Link to="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                     <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                 </Link>
                             </div>

                             <div className="flex-1 text-center py-2 m-2">
                                 <Link to="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                     <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                 </Link>
                             </div>

                             <div className="flex-1 text-center py-2 m-2">
                                 <Link to="#" onClick={emojihandleclick} className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                 <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                             </Link>
                             </div>
                         </div>
                     </div>

            
          <div className="flex-1">
            <button
              onClick={tweetFunction}
              className="bg-blue-400 mt-5 hover:bg-blue-600 text-black font-bold py-2 px-8 rounded-full mr-8 float-right"
            >
              Tweet
            </button>
          </div>
        </div>

        <hr className="border-blue-800 border-4" />


                 
        {/* Render tweets from Firestore */}
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
      <div className="flex">
        <div className="w-full">
          <div className="flex items-center">
            <div className="flex-1 text-center">
              <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </Link>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                </svg>
              </Link>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </Link>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
              </Link>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path>
                </svg>
              </Link>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <Link to="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
))}
      
<hr className="border-gray-600"/>
      </div>
    </>
  );
};

export default Home;
