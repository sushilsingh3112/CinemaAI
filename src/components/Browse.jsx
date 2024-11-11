import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovie';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearchPage';
import { useSelector } from 'react-redux';
import MovieInfo from './MovieInfo';


const Browse = () => {
  const showGptSearch=useSelector((store)=> store.gpt.showGptSearch);
  // const showMovieInfo=useSelector((store)=>store.movies.showMovieInfo);
  // console.log(showMovieInfo)
  
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();


  return (
    <>
    {/* in header the title signout profile */}
    {/* in MainContainer the background video title  */}
    {/* in secondaryContainer having n number of list of the movies */}
      <Header/>
      {showGptSearch?(
        <GptSearch/>
      ) 
      :
        <>
          <MainContainer/>
          <SecondaryContainer/>
        </>
      }
      
    </>
  )
}

export default Browse
