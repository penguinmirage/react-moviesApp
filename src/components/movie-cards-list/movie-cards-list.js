import React, { Component } from 'react';
import { format } from 'date-fns';
import SpinnerLoader from '../spinner-loader';
import PropTypes from 'prop-types';
import RatingComponent from '../rating-component';
import GenresContext from '../context/GenresContext';
import './movie-cards-list.css';

// Function to reduce text size
function reduceTextSize(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const reducedTextLength = text.slice(0, maxLength);
  return reducedTextLength.slice(0, reducedTextLength.lastIndexOf(' ')) + '...';
}

// Function to format date
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

// Styling for the placeholder div
const placeholderStyle = {
  width: '200px',
  height: '300px',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Function to get genre names from genre IDs
function getGenreNames(genreIds = []) {
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  return genreIds.map((id) => genreMap[id]).filter(Boolean);
}

// Function to get rating color based on value
function getRatingColor(voteAverage) {
  if (voteAverage < 3) return '#E90000'; // Red for ratings 0-3
  if (voteAverage < 5) return '#E97E00'; // Orange for ratings 3-5
  if (voteAverage < 7) return '#E9D100'; // Yellow for ratings 5-7
  return '#66E900'; // Green for ratings above 7
}

class MovieCardsList extends Component {
  static contextType = GenresContext;

  constructor(props) {
    super(props);
    this.state = {
      loadTitle: false,
      loadInfo: false,
      loadPoster: false,
    };
  }

  componentDidMount() {
    // Timeout for title to appear after 1 second
    this.titleTimeout = setTimeout(() => {
      this.setState({ loadTitle: true });
    }, 1000);

    // Timeout for info/rating to appear after 2 seconds
    this.infoTimeout = setTimeout(() => {
      this.setState({ loadInfo: true });
    }, 2000);

    // Timeout for poster to appear after 5 seconds
    this.posterTimeout = setTimeout(() => {
      this.setState({ loadPoster: true });
    }, 5000);
  }

  componentWillUnmount() {
    // Clear timeouts when the component is unmounted
    clearTimeout(this.titleTimeout);
    clearTimeout(this.infoTimeout);
    clearTimeout(this.posterTimeout);
  }

  render() {
    const { movies, loadPosters, onRate, movieRatings } = this.props;
    const { loadTitle, loadInfo, loadPoster } = this.state;

    return (
      <ul className="movie-cards-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <div className="movie-card-poster">
              {/* Poster */}
              {loadPoster && loadPosters ? (
                movie.poster_path ? (
                  <img
                    className="movie-poster"
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div style={placeholderStyle}>
                    <span>No Image Available</span>
                  </div>
                )
              ) : (
                <div style={placeholderStyle}>
                  <SpinnerLoader />
                </div>
              )}
            </div>

            <div className="movie-card-whole-info">
              {/* Title */}
              {loadTitle ? (
                <h2 className="movie-title">{movie.title}</h2>
              ) : (
                <SpinnerLoader />
              )}

              {/* Rating, Genre, and Overview */}
              {loadInfo ? (
                <>
                  <p
                    className="movie-rating"
                    style={{ color: getRatingColor(movie.vote_average) }}
                  >
                    {Math.round(movie.vote_average * 10) / 10}
                  </p>
                  <div className="movie-genre-list">
                    {/* Ensure genre_ids is defined and is an array */}
                    {getGenreNames(movie.genre_ids || []).map((genre, index) => (
                      <div key={index} className="movie-genre">
                        {genre}
                      </div>
                    ))}
                  </div>
                  <p className="movie-releaseDate">
                    Release: {formatDate(movie.release_date)}
                  </p>
                  <p className="movie-overview">
                    {movie.overview
                      ? reduceTextSize(movie.overview, 50)
                      : 'No information to be found in the database'}
                  </p>
                  <RatingComponent
                    className="movie-stars"
                    rating={movie.userRating || 0} // Ensure initial rating is displayed
                    movieId={movie.id}
                    movieRatings={movieRatings}
                    onRateChange={(newRating) => onRate(movie.id, newRating)} // Update with new rating
                    
                  />
                  
                </>
              ) : (
                <SpinnerLoader />
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

MovieCardsList.propTypes = {
  movies: PropTypes.array.isRequired,
  onRate: PropTypes.func.isRequired,
  movieRatings: PropTypes.object.isRequired,
};

export default MovieCardsList;


// //Movie-Cards-List.js
// import React, { Component } from 'react';
// import { format } from 'date-fns';
// import SpinnerLoader from '../spinner-loader';
// import PropTypes from 'prop-types';
// import RatingComponent from '../rating-component';
// import GenresContext from '../context/GenresContext';
// import './movie-cards-list.css';
// 
// // Function to reduce text size
// function reduceTextSize(text, maxLength) {
//   if (text.length <= maxLength) {
//     return text;
//   }
//   const reducedTextLength = text.slice(0, maxLength);
//   return reducedTextLength.slice(0, reducedTextLength.lastIndexOf(' ')) + '...';
// }
// 
// // Function to format date
// function formatDate(releaseDate) {
//   if (!releaseDate) {
//     return 'Unavailable';
//   }
// 
//   const date = new Date(releaseDate);
//   if (isNaN(date)) {
//     return 'Unavailable';
//   }
// 
//   return format(date, 'MMMM d, yyyy');
// }
// 
// // Base URL for the poster images
// const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
// 
// // Styling for the placeholder div
// const placeholderStyle = {
//   width: '200px',
//   height: '300px',
//   backgroundColor: 'white',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// };
// 
// // Map of genre IDs to genre names
// const genreMap = {
//   28: 'Action',
//   12: 'Adventure',
//   16: 'Animation',
//   35: 'Comedy',
//   80: 'Crime',
//   99: 'Documentary',
//   18: 'Drama',
//   10751: 'Family',
//   14: 'Fantasy',
//   36: 'History',
//   27: 'Horror',
//   10402: 'Music',
//   9648: 'Mystery',
//   10749: 'Romance',
//   878: 'Science Fiction',
//   10770: 'TV Movie',
//   53: 'Thriller',
//   10752: 'War',
//   37: 'Western',
// };
// 
// // Function to get genre names from genre IDs
// function getGenreNames(genreIds) {
//   return genreIds.map((id) => genreMap[id]).filter(Boolean);
// }
// 
// // Function to get rating color based on value
// function getRatingColor(voteAverage) {
//   if (voteAverage < 3) return '#E90000'; // Red for ratings 0-3
//   if (voteAverage < 5) return '#E97E00'; // Orange for ratings 3-5
//   if (voteAverage < 7) return '#E9D100'; // Yellow for ratings 5-7
//   return '#66E900'; // Green for ratings above 7
// }
// 
// class MovieCardsList extends Component {
//   static contextType = GenresContext;
//   
//   // Limit the number of displayed genres to a maximum of 3
//   getGenreNames = (genreIds) => {
//     const { genres } = this.context;
//     return genreIds
//       .map((id) => genres.find((genre) => genre.id === id)?.name) // Map IDs to genre names
//       .filter(Boolean) // Remove any undefined values
//       .slice(0, 3); // Limit to 3 genres max
//   };
//   
//   constructor(props) {
//     super(props);
//     this.state = {
//       loadTitle: false,
//       loadInfo: false,
//       loadPoster: false,
//     };
//   }
// 
//   componentDidMount() {
//     // Timeout for title to appear after 1 second
//     this.titleTimeout = setTimeout(() => {
//       this.setState({ loadTitle: true });
//     }, 1000);
// 
//     // Timeout for info/rating to appear after 2 seconds
//     this.infoTimeout = setTimeout(() => {
//       this.setState({ loadInfo: true });
//     }, 2000);
// 
//     // Timeout for poster to appear after 5 seconds
//     this.posterTimeout = setTimeout(() => {
//       this.setState({ loadPoster: true });
//     }, 5000);
//   }
// 
//   componentWillUnmount() {
//     // Clear timeouts when the component is unmounted
//     clearTimeout(this.titleTimeout);
//     clearTimeout(this.infoTimeout);
//     clearTimeout(this.posterTimeout);
//   }
// 
//   render() {
//     const { movies, loadPosters, onRate } = this.props;
//     const { loadTitle, loadInfo, loadPoster } = this.state;
// 
//     return (
//       <ul className="movie-cards-list">
//         {movies.map((movie) => (
//           <li key={movie.id} className="movie-card">
//           <div className="movie-card-poster">{/* Poster */}
//           {loadPoster && loadPosters ? (
//             movie.poster_path ? (
//               <img className="movie-poster"
//                 src={`${IMAGE_BASE_URL}${movie.poster_path}`}
//                 alt={movie.title}
//               />
//             ) : (
//               <div style={placeholderStyle}>
//                 <span>No Image Available</span>
//               </div>
//             )
//           ) : (
//             <div style={placeholderStyle}>
//               <SpinnerLoader />
//             </div>
//           )} </div>
//           
//           <div className="movie-card-whole-info">
//             {/* Title */}
//             {loadTitle ? (
//               <h2 className="movie-title">{movie.title}</h2>
//             ) : (
//               <SpinnerLoader />
//             )}
//             
//             {/* Rating, Genre, and Overview */}
//             {loadInfo ? (
//               <>
//                 <p
//                   className="movie-rating"
//                   style={{ color: getRatingColor(movie.vote_average) }}
//                 >
//                   {Math.round(movie.vote_average * 10) / 10}
//                 </p>
//                 <div className="movie-genre-list">
//                   {getGenreNames(movie.genre_ids).map((genre, index) => (
//                     <div key={index} className="movie-genre">
//                       {genre}
//                     </div>
//                   ))}
//                 </div>
//                 <p className="movie-releaseDate">Release: {formatDate(movie.release_date)}</p>
//                 <p className="movie-overview">
//                   {movie.overview
//                     ? reduceTextSize(movie.overview, 50)
//                     : 'No information to be found in the database'}
//                 </p>
//                 <RatingComponent
//                   className="movie-stars"
//                   rating={movie.userRating || 0} // Ensure initial rating is displayed
//                   onRateChange={(newRating) => onRate(movie.id, newRating)} // Update with new rating
//                 />
//               </> 
//             ) : (
//               <SpinnerLoader />
//             )}
//             
//           </div>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }
// 
// MovieCardsList.propTypes = {
//   movies: PropTypes.array.isRequired,
//   onRate: PropTypes.func.isRequired, // Ensure onRate is defined as prop
// };
// 
// export default MovieCardsList;



/////////////////////////////////////////////////////////////

/// import React, { Component } from 'react';
// import './movie-cards-list.css';
// 
// 
// 
// // 1. Подключение Movie-Card
// // 2. Фетч с API и заполнение списка карточек
// // 3. Пагинация для карточек
// // 4. Не забыть подключить поиск-компонент
// 
// export default class MovieCardsList extends Component {
//   state = {
//     itemName: null,
//     itemInfo: null,
//     genreType: null,
//     ratingStars: null,
//   };
// 
//   render() {
//     return <div className="cards-list">
//     <ul>
//     <li></li>
//     </ul></div>;
//   }
// }
