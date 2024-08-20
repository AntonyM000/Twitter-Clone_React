import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import React, { useRef } from 'react';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { FaSquareXTwitter } from "react-icons/fa6";

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); 
  const auth = getAuth();
  const db = getFirestore(app);
  const { signin } = useAuth ();


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
   
    signin (email,password,navigate)
  };
  return (
    <>
    <div className='logo-image bg-slate-600'></div>
    <form className=' flex flex-col m-3 rounded items-center ' onSubmit={handleSubmit}>
    <FaSquareXTwitter size={72} className="text-blue-700"/>
      <h2 className="font-medium text-4xl">Log in to X</h2>
       <input className='m-2 max-w-screen-sm rounded border-2 py-2 items-center align-middle justify-center px-10' type="email" ref={emailRef} placeholder='Email'/>
       <input className='m-2 max-w-screen-sm rounded border-2 py-2 px-10' type="text" ref={passwordRef} placeholder='Password'/>
    <button className="p-1 bg-blue-600 rounded-3xl text-white font-bold px-10 min-w-28">Login</button>
    </form>
    </>
  )
}

export default Login