import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import React, { useRef } from 'react';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

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
    <form className='bg-red-100 flex flex-col m-3 rounded items-center ' onSubmit={handleSubmit}>
      <h2>Login</h2>
       <input className='m-2 rounded ' type="email" ref={emailRef} placeholder='Email'/>
       <input className='m-2 rounded ' type="text" ref={passwordRef} placeholder='Password'/>
    <button className="p-1 bg-blue-gray-900 rounded text-white ">Login</button>
    </form>
    </>
  )
}

export default Login