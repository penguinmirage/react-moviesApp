


import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import MovieapiService from './api-service/movieapi.js'

// class MovieapiService {
//   // Base URL for the API
//   _apiBase = 'https://api.themoviedb.org/3';
// 
//   // Method to fetch resources with authorization
//   async getResource(url) {
// 	const options = {
// 	  method: 'GET',
// 	  headers: {
// 		accept: 'application/json',
// 		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmRiZmNiOGYwYzcwYjQ1ODViMWNjZDRiNDUwMTcxMCIsIm5iZiI6MTcyOTk3ODMwNS4wMTIzNzcsInN1YiI6IjY3MTdhZmUyNDVjZDY3NjIyMzU4OWViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gpFcGOyx0_AiQTCShmysg0JZ7WyMdJvtEvG6agsOB2o'
// 	  }
// 	};
// 	const res = await fetch(`${this._apiBase}${url}`, options);
// 
// 	if (!res.ok) {
// 	  throw new Error(`Could not fetch ${url}, received ${res.status}`);
// 	}
// 
// 	return await res.json();
//   }
// 
//   // Method to get all movies based on a search query
//   searchMovies(query) {
// 	return this.getResource(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
//   }
// 
//   // Method to get movie details by ID
//   getMovie(id) {
// 	return this.getResource(`/movie/${id}`);
//   }
// 
//   // Method to get movie images by ID
//   getMovieImages(id) {
// 	return this.getResource(`/movie/${id}/images`);
//   }
// }

const movieapi = new MovieapiService();
// 
// movieapi.searchMovies('return')
//   .then((body) => {
// 	console.log(body);
//   })
//   .catch((error) => {
// 	console.error('Error fetching movies:', error);
//   });
//   
  // class App extends React.Component {
	// state = {
	//   movies: [],
	//   error: null
	// };
  // 
	// componentDidMount() {
	//   movieapi.searchMovies('return')
	// 	.then((data) => {
	// 	  this.setState({ movies: data.results });
	// 	})
	// 	.catch((error) => {
	// 	  this.setState({ error: 'Failed to fetch movies' });
	// 	});
	// }
  // 
	// render() {
	//   const { movies, error } = this.state;
  // 
	//   return (
	// 	<div>
	// 	  <h1>Movie Search Results</h1>
	// 	  {error && <p style={{ color: 'red' }}>{error}</p>}
	// 	  <ul>
	// 		{movies.map(movie => (
	// 		  <li key={movie.id}>
	// 			<h2>{movie.title}</h2>
	// 			<p>Release Date: {movie.release_date}</p>
	// 			<p>{movie.overview}</p>
	// 		  </li>
	// 		))}
	// 	  </ul>
	// 	</div>
	//   );
	// }
  // }
  
  // Render the App component
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);

// class MovieapiService {
//   // _apiBase = 'https://api.themoviedb.org/3';
// async getResource(url) {
// 	const options = {
// 	  method: 'GET',
// 	  headers: {
// 		accept: 'application/json',
// 		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmRiZmNiOGYwYzcwYjQ1ODViMWNjZDRiNDUwMTcxMCIsIm5iZiI6MTcyOTk3ODMwNS4wMTIzNzcsInN1YiI6IjY3MTdhZmUyNDVjZDY3NjIyMzU4OWViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gpFcGOyx0_AiQTCShmysg0JZ7WyMdJvtEvG6agsOB2o'
// 	  }
// 	};
//   const res = await fetch(`https://api.themoviedb.org/3${url}`, options);
// 	
// 	if (!res.ok) {
// 	  throw new Error(`Could not fetch ${url}` +
// 	  `, received ${res.status}`)
// 	  
// 	}
// 	
// 	return await res.json();
//   };
//   
//   getAllMovies() {
// 	return this.getResource(`https://api.themoviedb.org/3/search/movie/`)
//   }
//   
//   getMovies(id) {
// 	return this.getResource(`https://api.themoviedb.org/3/search/movie/${movie_id}/`)
//   }
//   getImage(id) {
// 	return this.getResource(`https://api.themoviedb.org/3/movie/${movie_id}/images`)
//   }
// }
// 
// const movieapi = new MovieapiService();
// 
// movieapi.getAllMovies()
// .then((body) => {
// 	console.log(body);
// });