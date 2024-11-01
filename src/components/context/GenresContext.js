import React from 'react';


const GenresContext = React.createContext({
  genres: [],
  fetchGenres: () => {},
});

export default GenresContext;