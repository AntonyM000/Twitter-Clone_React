import React, { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { app } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoImagesOutline } from "react-icons/io5";

const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(false);


  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signup(name, email, password, navigate);
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
    const storage = getStorage(app);
    const storageRef = ref(storage, 'profilepicture/' + file.name);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <>

{/* start */}         
              <input
                type="file"
                className="invisible"
                id="imageupload"
                onChange={handleFileChange}
              />
{/* end */}


      <form className='bg-red-100 flex flex-col m-3 rounded items-center ' onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input className="m-2 rounded" type="email" ref={emailRef} placeholder="Email"/>
        <input className='m-1 rounded ' type="text" ref={nameRef} placeholder="Name"/>
        <input className='m-2 rounded ' type="password" ref={passwordRef} placeholder="Password"/>
              <div className="flex-1 -ml-72 text-center px-1 py-1 m-2">
                <label
                  htmlFor="imageupload"
                  className="mt-1 group flex items-center bg-red-200  text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                  >Upload profile picture
                </label>
                </div>
       <div className="flex">
          <div className="flex-1 px-2 pt-2 mt-2">
            {imageSrc && <img src={imageSrc} className="max-w-60 placeholder='image' bg-black rounded" alt="" />}
          </div>
        </div>

        <button className="bg-blue-gray-900 m-1 rounded-3xl text-white w-20">Next</button>
      </form>
    </>
  );
};

export default SignUp;
