import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux';
// import openai from '../utils/openAi';
import axios from 'axios';
import { API_OPTIONS, GEMINI_KEY } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';


const GptSearchBar = () => {
 const langKey= useSelector((store)=>store.config.lang);
 const searchText=useRef(null); 
 const dispatch=useDispatch();

 const searchMovieTMDB=async(movie)=>{
  const data = await fetch(
    'https://api.themoviedb.org/3/search/movie?query='+
    movie+
    '&include_adult=false&language=hi&page=1', 
    API_OPTIONS
  )
  const json=await data.json();
  console.log(json);
  return json.results;
 }

 const handleGptSearchClick= async ()=>{
  console.log(searchText.current.value);
  //Make an api call to GPT API and get movie result

  const gptQuery="Act as a movie recommendation system and suggest some movies for the query :" +
    searchText.current.value +
    "only give me names of 5 movies , commas separted"
   
  // const getResults = await openai.chat.completions.create({
  //   messages: [{ role: 'user', content: gptQuery }],
  //   model: 'gpt-3.5-turbo',
  // });
  
  //GEMINI API
  try {
    const getResults = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_KEY,
      {
        contents: [
          { parts: [{ text: gptQuery }] }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const moviesList=getResults?.data?.candidates[0]?.content?.parts[0]?.text.split(",");
    console.log(moviesList);

    // for each movie I will search TMBD API
    // console.log(searchMovieTMDB(Baazigar));
    const promiseArray=moviesList.map((movie)=>searchMovieTMDB(movie));

    const tmbdResults= await Promise.all(promiseArray);
    console.log(tmbdResults);

    //dispatch the movies to the gptstore
    dispatch(addGptMovieResults({movieNames:moviesList,movieResults:tmbdResults}));


  } catch (error) {
    console.error('Error fetching results:', error);
  }

  


 }

  return (
    <div className='pt-[10%] flex justify-center '>
      <form className='w-1/2 bg-black grid grid-cols-12 rounded-lg'
        onSubmit={(e)=>e.preventDefault()} 
        action="">
        <input 
            ref={searchText}
            type="text" 
            className='p-4 m-4 col-span-9' 
            placeholder={lang[langKey].gptSearchPlaceholder} 
        />
        <button 
            className=' col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg'
            onClick={handleGptSearchClick}
            >{lang[langKey].search}
        </button>  
      </form>
    </div>
  )
}

export default GptSearchBar
