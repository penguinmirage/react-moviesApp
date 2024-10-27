import React, { Component } from 'react';
import { format } from 'date-fns';
import SpinnerLoader from '../spinner-loader';
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

// Map of genre IDs to genre names
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

// Function to get genre names from genre IDs
function getGenreNames(genreIds) {
  return genreIds.map((id) => genreMap[id]).filter(Boolean).join(', ');
}

class MovieCardsList extends Component {
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
    const { movies, loadPosters } = this.props;
    const { loadTitle, loadInfo, loadPoster } = this.state;

    return (
      <ul className="movie-cards-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            {/* Title */}
            {loadTitle ? (
              <h2>{movie.title}</h2>
            ) : (
              <SpinnerLoader />
            )}
            
            {/* Rating, Genre, and Overview */}
            {loadInfo ? (
              <>
                <p className="movie-rating">
                  {Math.round(movie.vote_average * 10) / 10}
                </p>
                <p className="movie-genre">{getGenreNames(movie.genre_ids)}</p>
                <p>Release Date: {formatDate(movie.release_date)}</p>
                <p>
                  {movie.overview
                    ? reduceTextSize(movie.overview, 313)
                    : 'No information to be found in the database'}
                </p>
              </>
            ) : (
              <SpinnerLoader />
            )}
            
            {/* Poster */}
            {loadPoster && loadPosters ? (
              movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '200px', height: '300px' }}
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
          </li>
        ))}
      </ul>
    );
  }
}

export default MovieCardsList;



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
