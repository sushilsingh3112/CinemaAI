export const BG_URL="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg";

export const LOGO_URL=
    "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR=
          "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" 

export const API_OPTIONS={
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_KEY,
    },
};

export const IMG_CDN_URL="https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGUAGE=[
  {identifier:"english",name:"english"},
  {identifier:"hindi",name:"hindi"},
  {identifier:"spanish",name:"spanish"},
]

// export const OPENAI_KEY=import.meta.env.VITE_OPENAI_KEY;

export const GEMINI_KEY= import.meta.env.VITE_GEMINI_KEY;

export const YOUTUBE_LINK="http://www.youtube.com/watch?v="