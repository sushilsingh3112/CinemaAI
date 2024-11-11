import React  from 'react'
import Login from './Login'
import Browse from './Browse'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import MovieInfo from './MovieInfo'


const Body = () => {
  
    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browse/>
        },
        {
            path:"/browse/:movieName/:id",
            element:<MovieInfo/>
        },

    ]);



  return (
    <>
        <RouterProvider router={appRouter}/>
    </>
  )
}

export default Body
