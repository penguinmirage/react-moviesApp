import React, { Component } from 'react';

import FilterComponent from '../filter-component';
import SearchComponent from '../search-component';
import MovieCardsList from '../movie-cards-list';
import MovieapiService from '../../api-service/movieapi.js';
import './app.css';

export default class App extends Component {
  // Define movieapi as a class property
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
        <MovieCardsList />
        <div>
          <h1>Movie Search Results</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <h2>{movie.title}</h2>
                <p>Release Date: {movie.release_date}</p>
                <p>{movie.overview}</p>
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
