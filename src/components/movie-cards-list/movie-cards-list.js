import React, { Component } from 'react';
import { format } from 'date-fns';
import SpinnerLoader from '../spinner-loader';
import PropTypes from 'prop-types';
import RatingComponent from '../rating-component';
import GenresContext from '../context/GenresContext';
import './movie-cards-list.css';


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


const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


const placeholderStyle = {
  width: '183px',
  height: '300px',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};


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

function getRatingColor(voteAverage) {
  if (voteAverage < 3) return '#E90000'; 
  if (voteAverage < 5) return '#E97E00';
  if (voteAverage < 7) return '#E9D100'; 
  return '#66E900'; 
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
 
    this.titleTimeout = setTimeout(() => {
      this.setState({ loadTitle: true });
    }, 1000);

 
    this.infoTimeout = setTimeout(() => {
      this.setState({ loadInfo: true });
    }, 2000);


    this.posterTimeout = setTimeout(() => {
      this.setState({ loadPoster: true });
    }, 5000);
  }

  componentWillUnmount() {

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
             
              {loadPoster && loadPosters ? (
                movie.poster_path ? (
                  <img
                    className="movie-poster"
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className='placeholderStyleMobile'>
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
             
              {loadTitle ? (
                <h2 className="movie-title">{reduceTextSize(movie.title, 30)}</h2>
              ) : (
                <SpinnerLoader />
              )}

          
              {loadInfo ? (
                <>
                  <p
                    className="movie-rating"
                    style={{ color: getRatingColor(movie.vote_average) }}
                  >
                    {Math.round(movie.vote_average * 10) / 10}
                  </p>
                  <div className="movie-genre-list">
                   
                    {getGenreNames(movie.genre_ids || []).slice(0, 3).map((genre, index) => (
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
                      ? reduceTextSize(movie.overview, 100)
                      : 'No information to be found in the database'}
                  </p>
                  
                  <div className="movie-stars">
                  <RatingComponent  
                    rating={movie.userRating || 0} 
                    movieId={movie.id}
                    movieRatings={movieRatings}
                    onRateChange={(newRating) => onRate(movie.id, newRating)} 
                  />
                  </div>
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