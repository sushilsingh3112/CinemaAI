import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { API_OPTIONS,IMG_CDN_URL,LOGO_URL,YOUTUBE_LINK} from '../utils/constants'



const MovieInfo = () => {
    const {id}=useParams();
    const [movieInfo, setMovieInfo] = useState(null);
    const [key, setKey] = useState("");



    const getMovieInfo= async ()=>{
      const data= await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,API_OPTIONS)
      const json= await data.json();
      // console.log(json);
      setMovieInfo(json); 
    } 

    const getMovieTrailerKey= async () =>{
      const data=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, API_OPTIONS)
      const json= await data.json();
      const filterData=json.results.filter((video)=>video.type ==="Trailer")
      const trailer=filterData.length? filterData[0] : json.results; 
      setKey(trailer?.key)
      // console.log(key)
    }

    useEffect(()=>{
      getMovieInfo();
      getMovieTrailerKey();
    },[id])

    if (!movieInfo) return <p>Loading...</p>;

    const { poster_path, original_title, release_date, runtime, overview,vote_average,genres,
      spoken_languages,
      origin_country
         
    } = movieInfo;
    


  return (
    <div className='bg-slate-700'>
      <div className='flex justify-between bg-gradient-to-b from-black bg-blue-400'>
      <img 
        className='w-44 z-10  ' 
        src={LOGO_URL} alt="logo" 
      />
      </div>

      {/* body start */}
      <div className='max-w-7xl mx-auto p-6'>
        {/* movie container */}
        <div className='flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='lg:w-1/3'>
              <img 
                src={IMG_CDN_URL+poster_path} 
                alt="Movie Poster" 
              />
            </div>
            
            {/* Movie Details */}
            <div className='lg:w-2/3 p-8'>
              {/* movie Title */}
              <h1
              className='text-5xl 4xl font-bold text-gray-900 mb-6'
              >
                {original_title}
              </h1>
              {/* Release date */}
              <p
              className='text-lg font-bold text-gray-800 mb-4'
              >
                <p>Release Date : {release_date}</p>
                <p>Duration : {runtime} minutes</p>
                <p>Rating : {vote_average.toFixed(1)}/10</p>
                <p>Country : {origin_country[0]}</p>
              </p>
              {/* movie Description */}
              <p 
              className="text-xl text-gray-800 mb-3 leading-relaxed">
                <h2 className='font-bold'>Story  </h2>
                {overview}
              </p>  
              {/*Genre Section  */}
              <div className='mb-2'>
                <h4
                className='text-xl font-bold text-gray-800 '
                >Genres</h4>
                <p className='text-gray-600'> 
                  {genres.map((genre,index)=>(
                    <span key={genre.id}>
                      {genre.name}
                      {index < genres.length - 1 && ', '} {/* Add a comma if it's not the last item */}
                    </span>
                  ))}
                </p>
              </div>
              {/* Language Section */}
              <div className='mb-4'>
                <h4
                className='text-xl font-bold text-gray-800 '
                >Languages</h4>
                <p className='text-gray-600'> 
                  {spoken_languages.map((lan,index)=>(
                    <span key={lan.name}>
                      {lan.name}
                      {index < genres.length  && ', '} {/* Add a comma if it's not the last item */}
                    </span>
                  ))}
                </p>
              </div>
              {/* watch now button */}
              <div>
                <button 
                  onClick={() => window.open(`${YOUTUBE_LINK}${key}`, '_blank', 'noopener,noreferrer')}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                  disabled={!key}
                >
                  Watch Trailer
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MovieInfo
