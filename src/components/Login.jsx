import React, { useRef } from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'
import { useState } from 'react';
import { validate } from '../utils/validate';
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';



const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const dispatch=useDispatch()

  const email=useRef(null);
  const password=useRef(null);
  const name =useRef(null);


  // Sign In/Sign Up button click handler
  const toggleSignInForm=()=>{
    setisSignInForm(!isSignInForm)
  }

  // validate email and password
  const handleButtonClick=()=>{
    const message =validate(email.current.value,password.current.value);
    setErrorMessage(message);

    if(message) return;

    //SIGN UP
    if(!isSignInForm){
      //sign up user
      createUserWithEmailAndPassword(
      auth,
      email.current.value, 
      password.current.value
      )
        .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, 
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          const {uid,email,displayName} = auth.currentUser;
            dispatch(
              addUser({
                uid:uid,
                email:email,
                displayName:displayName
              }));
              // console.log(displayName)
        });
        
        // console.log(user);
        
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage);
      });
    }
    //SIGN IN
    else{
      signInWithEmailAndPassword(
      auth, 
      email.current.value,
      password.current.value)
      //Sign in user
        .then((userCredential) => {
              const user = userCredential.user;
         })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });


    }
  }


  return (
   <>
    <Header/>
    <div className='relative min-h-screen'>
      <div className='fixed inset-0'>
        <img className='w-full h-full object-cover' 
          src={BG_URL} 
          alt="background"/>
      </div>

      <div className='relative flex items-center justify-center min-h-screen'>
        {/* form  */}
        <form 
        onSubmit={(e)=>e.preventDefault()}
        className='bg-black p-12 w-full md:w-3/12 text-white rounded-lg bg-opacity-80'>

          {/* Sign In/Sign Up heading */}
          <h1 
          className='font-bold text-3xl py-4'>
          { isSignInForm ?'Sign In':'Sign Up'}
          </h1>
          
           {/* Full name input */}
          {!isSignInForm &&(
            <input 
            ref={name}
            className="w-full p-4 my-4 border rounded bg-gray-700" type="text" placeholder='Full name' />)
          }
          
          {/* Email input */}
          <input 
          ref={email}
          className='w-full p-4 my-4 border rounded bg-gray-700'
          type="email" 
          placeholder='Email' 
          />

          {/* Password input */}
          <input 
          ref={password}
          className="w-full p-4 my-4 border rounded bg-gray-700" 
          type="password" 
          placeholder='Password' 
          />
          
          {/*  */}
          <p className='text-red-600  font-bold'>{errorMessage}</p>

          {/* Sign In/Sign Up button */}
          <button 
          onClick={handleButtonClick}
          className='bg-red-700 w-full p-4 my-3 rounded'>
          { isSignInForm ?'Sign In':'Sign Up'}
          </button>

          <p 
          onClick={toggleSignInForm}
          className='text-center cursor-pointer hover:underline'
          >
          { isSignInForm ?'new to here? Sign Up':'Sign In'}
          </p>

        </form>
      </div>
    </div>

   </>
  )
}

export default Login
