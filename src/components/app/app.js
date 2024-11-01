
import React, { Component } from 'react';
import MovieapiService from '../../api-service/movieapi.js';
import SpinnerLoader from '../spinner-loader';
import FilterComponent from '../filter-component';
import { Alert, Pagination } from 'antd';
import './app.css';

export default class App extends Component {
  movieapi = new MovieapiService();

  state = {
    movies: [],
    error: null,
    isLoading: false,
    loadPosters: false,
    isOffline: !navigator.onLine,
    noResults: false,
    searchQuery: '',
    currentPage: 1,
    pageSize: 10,
    totalResults: 0,
    showInfoAlert: true,
    ratedMovies: [],
    movieRatings: {},
  };

  componentDidMount() {
    window.addEventListener('online', this.updateNetworkStatus);
    window.addEventListener('offline', this.updateNetworkStatus);
    this.loadRatedMovies();
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateNetworkStatus);
    window.removeEventListener('offline', this.updateNetworkStatus);
  }

  updateNetworkStatus = () => {
    const isOffline = !navigator.onLine;
    this.setState({ isOffline });
  };
  
  loadRatedMovies = () => {
    this.movieapi.getRatedMovies()
      .then((ratedMovies) => {
        const storedRatings = this.movieapi.getStoredRatings();
        this.setState({ ratedMovies, movieRatings: storedRatings });
      })
      .catch((error) => this.setState({ error: 'Failed to load rated movies' }));
  };

  fetchMovies(query, page = 1) {
    this.setState({ isLoading: true, error: null, noResults: false });

    if (!query) {
      this.setState({ isLoading: false, noResults: true });
      return;
    }

    this.movieapi.searchMovies(query, page)
      .then((data) => {
        if (data.results.length === 0) {
          this.setState({ noResults: true, isLoading: false });
        } else {
          this.setState({
            movies: data.results,
            isLoading: false,
            noResults: false,
            totalResults: data.total_results,
          });
        }
        setTimeout(() => {
          this.setState({ loadPosters: true });
        }, 1000);
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch movies', isLoading: false });
      });
  }

  handleSearch = (query = '') => {
    this.setState({ searchQuery: query, currentPage: 1, showInfoAlert: false });
    this.fetchMovies(query);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.fetchMovies(this.state.searchQuery, page);
  };

  handleRateMovie = (movieId, rating) => {
    if (rating > 0) {
      this.movieapi.addRating(movieId, rating);
      this.setState((prevState) => ({
        movieRatings: { ...prevState.movieRatings, [movieId]: rating },
      }));
    } else {
      this.movieapi.deleteRating(movieId);
      this.setState((prevState) => {
        const updatedRatings = { ...prevState.movieRatings };
        delete updatedRatings[movieId];
        return { movieRatings: updatedRatings };
      });
    }
  };

  closeInfoAlert = () => {
    this.setState({ showInfoAlert: false });
  };

  render() {
    const { movies, ratedMovies, error, isLoading, loadPosters, isOffline, noResults, currentPage, pageSize, totalResults, showInfoAlert } = this.state;

    if (isLoading) {
      return <SpinnerLoader />;
    }

    return (
      <div className="app">
        <FilterComponent className='filter-component'
          ratedMovies={ratedMovies}
          onSearch={this.handleSearch}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalResults={totalResults}
          onRate={this.handleRateMovie}
          movies={movies}
          loadPosters={loadPosters}
          movieRatings={this.state.movieRatings}
        />
        
        {showInfoAlert && (
          <Alert
            className="alert-message"
            message="Type something in the search field. Use Rated to rate or look for."
            type="info"
            showIcon
            closable
            onClose={this.closeInfoAlert}
          />
        )}
        {isOffline && (
          <Alert
            className="alert-message"
            message="No network connection"
            description="Check your router or reboot your computer. This page will reload automatically when you go online again."
            type="error"
            showIcon
          />
        )}
        {error && (
          <Alert
            className="alert-message"
            message="Error"
            description={error}
            type="error"
            showIcon
            closable={false}
          />
        )}
        {noResults && (
          <Alert
            className="alert-message"
            message="No search results"
            type="warning"
            showIcon
          />
        )}
      </div>
    );
  }
}
