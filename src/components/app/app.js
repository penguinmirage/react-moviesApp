import React, { Component } from 'react';
import { format } from 'date-fns'; 
import{ Spin }from"antd";

import FilterComponent from '../filter-component';
import SearchComponent from '../search-component';
import MovieCardsList from '../movie-cards-list';
import MovieapiService from '../../api-service/movieapi.js';

import './app.css';


function reduceTextSize(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const reducedTextLength = text.slice(0, maxLength);
  return reducedTextLength.slice(0, reducedTextLength.lastIndexOf(' ')) + '...';
}


function formatDate(releaseDate) {
  if (!releaseDate) {
    return 'Unavailable';
  }

  const date = new Date(releaseDate);
  if (isNaN(date)) {
    return 'Unavailable';
  }

  return format(date, 'MMMM d, yyyy');
}

// Base URL for the poster images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Для пустых изображений, когда нет постера
const placeholderStyle = {
  width: '200px',
  height: '300px',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default class App extends Component {

  movieapi = new MovieapiService();

  state = {
    movies: [],
    error: null
  };

  componentDidMount() {
    this.movieapi.searchMovies('return')
      .then((data) => {
        this.setState({ movies: data.results });
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch movies' });
      });
  }

  render() {
    const { movies, error } = this.state;
    return (
      <div>
        <FilterComponent />
        <SearchComponent />
        <div>
          <h1>MoviesApp</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <h2>{movie.title}</h2>
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: '200px', height: '300px' }} 
                  />
                ) : (
                  <div style={placeholderStyle}>
                    <span>Failed to find an Image</span>
                  </div>
                )}
                <p>Release Date: {formatDate(movie.release_date)}</p> 
                <p>
                  {movie.overview 
                    ? reduceTextSize(movie.overview, 313) 
                    : 'No information to be found in the database'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

// import React, { Component } from 'react';
// 
// import FilterComponent from '../filter-component';
// import SearchComponent from '../search-component';
// import MovieCardsList from '../movie-cards-list';
// import MovieapiService from './api-service/movieapi.js'
// import './app.css';
// 
// 
// 
// export default class App extends Component {
// movieapi = new MovieapiService();
// 
// state = {
//   movies: [],
//   error: null
// };
// 
// componentDidMount() {
//   movieapi.searchMovies('return')
//   .then((data) => {
//     this.setState({ movies: data.results });
//   })
//   .catch((error) => {
//     this.setState({ error: 'Failed to fetch movies' });
//   });
// }	
//   
//   render() {
//     const { movies, error } = this.state;
// 		return (
//     <FilterComponent />,
//     <SearchComponent />,
//     <MovieCardsList />,
//     <div>
//       <h1>Movie Search Results</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//       {movies.map(movie => (
//         <li key={movie.id}>
//         <h2>{movie.title}</h2>
//         <p>Release Date: {movie.release_date}</p>
//         <p>{movie.overview}</p>
//         </li>
//       ))}
//       </ul>
//     </div>
//   )
// 	}
// }
