import {configureStore } from '@reduxjs/toolkit';
import userReducer  from './UserSlice';
import moviesReducer from "./MoviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const AppStore= configureStore(
    {
        reducer:{
            user:userReducer,
            movies:moviesReducer,
            gpt: gptReducer,
            config:configReducer,
        },
    }
)

export default AppStore;