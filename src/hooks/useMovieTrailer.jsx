import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/MoviesSlice";
import { useDispatch, useSelector } from 'react-redux';

const useMovieTrailer=(id)=>{
    const dispatch= useDispatch();
    // const [trailerId,setTrailerId]= useState(null); alternative for redux
    const movieTrailer=useSelector((store)=>store.trailerVideo)

    const getMoviesVideos= async ()=>{
      const data=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS)
      const json= await data.json();
    
      const filterData=json.results.filter((video)=>video.type ==="Trailer")
      const trailer=filterData.length? filterData[0] : json.results;
      
      dispatch(addTrailerVideo(trailer))
    }
    useEffect(()=>{
      !movieTrailer && getMoviesVideos();
    },[])
  
}
export default useMovieTrailer;