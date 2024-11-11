import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToggleMovieInfoView } from '../utils/MoviesSlice';
import { useState } from 'react';

const MovieCard = ({movieName,posterPath,id}) => {
  if(!posterPath) return null;

  // const dispatch =useDispatch();
  // const [renderToggle, setRenderToggle] = useState(false);

  // const handleMovieViewInfo = () => {
  //   dispatch(addToggleMovieInfoView());
  //   setRenderToggle(!renderToggle); // Toggle local state to force re-render
  // };

  return (
   <Link to={`/browse/${movieName}/${id}`} >

    <div className='w-48 pr-4 hover:cursor-pointer'
    >
      <img  
      alt="Movie Card" 
      src={IMG_CDN_URL+posterPath}
      />
    </div>

    </Link>
  );
};

export default MovieCard
