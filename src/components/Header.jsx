import React, { useEffect, useState } from 'react'
import { LOGO_URL, SUPPORTED_LANGUAGE, USER_AVATAR } from '../utils/constants'
import {  onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/UserSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import {changeLanguage} from '../utils/configSlice';
import lang from '../utils/languageConstants';


const Header = () => {
  
  const showLanguageChange=useSelector((store)=>store.gpt.showGptSearch)
  const langKey=useSelector((store)=>store.config.lang)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user =useSelector((store)=>store.user);
  const [isClicked, setIsClicked] = useState(false);

  const handleSignOut=()=>{
    setIsClicked(true);//I use this only for color change purpose 
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      // An error happened.
      navigate("/error")
    });

  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {// if user is sign in
        const {uid,email,displayName} = user;
        dispatch(
          addUser({
            uid:uid,
            email:email,
            displayName:displayName
          }));
          navigate("/browse");
      } else {// if user is sign out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=> unsubscribe();
    
},[]);

  const handleGptSearchClick=()=>{
    // toggle GPT Search 
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange=(e)=>{
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value) )

  }

  return (
    <>
      <div className=' absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between '>
        <img 
        className='w-44 ' 
        src={LOGO_URL} alt="logo" 
        />
        {user &&(
        <div className='flex p-4 m-2 gap-2 cursor-pointer '>
      
      {showLanguageChange &&( 
        <select className='p-2 m-2 bg-gray-900 text-white rounded-lg' onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGE.map((lang)=>(
              <option key={lang.identifier} value={lang.identifer}>
                {lang.name}
              </option>
            ))}

          </select>
        )}
          
          <button className='bg-purple-900 px-4 py-2 mx-4 my-2 rounded-lg text-white'
          onClick={handleGptSearchClick}>
            {showLanguageChange ?
            lang[langKey].homePage
            :"GPT Search"}
          </button>
          
          <img 
          className='w-12 h-15'
          src={USER_AVATAR}
          alt="usericon" />

          <button 
          onClick={handleSignOut}
          className={` text-white px-4 py-2 rounded-md ${
            isClicked ? 'bg-blue-700' : 'bg-violet-900'
          }`}
          >
            {showLanguageChange ?
            lang[langKey].signOut
            :"Sign Out"}
          </button>
        </div>
)}


      </div>
      
    </>
  )
}

export default Header
