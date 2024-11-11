import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {addNowPlayingMovies} from '../utils/MoviesSlice'


const useNowPlayingMovies=()=>{
    const dispatch= useDispatch(); 
    // memoization
    const nowPlaying=useSelector((store)=>store. nowPlayingMovies)

    const nowPlayingMovies= async()=>{
     const data= await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=hi-IN&page=1',
      API_OPTIONS);
      const json= await data.json();
      
      dispatch(addNowPlayingMovies(json.results));
    };
  
  useEffect(()=>{
    !nowPlaying && nowPlayingMovies();
  },[])
}

export default useNowPlayingMovies;