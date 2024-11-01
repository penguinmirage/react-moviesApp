import React from 'react';

// Создаем контекст для хранения списка жанров
const GenresContext = React.createContext({
  genres: [],
  fetchGenres: () => {},
});

export default GenresContext;