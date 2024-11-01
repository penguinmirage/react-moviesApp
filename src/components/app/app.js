// //App.js
// import React, { Component } from 'react';
// import MovieapiService from '../../api-service/movieapi.js';
// import SpinnerLoader from '../spinner-loader';
// import MovieCardsList from '../movie-cards-list';
// import FilterComponent from '../filter-component';
// import SearchComponent from '../search-component';
// import { Alert, Pagination } from 'antd';  // Import Pagination from antd
// import './app.css';
// 
// export default class App extends Component {
//   movieapi = new MovieapiService();
// 
//   state = {
//     movies: [],
//     error: null,
//     isLoading: false, // Initial loading set to false, since there's no auto-fetch on load
//     loadPosters: false,
//     isOffline: !navigator.onLine,
//     noResults: false,
//     searchQuery: '',
//     currentPage: 1,
//     pageSize: 10,
//     totalResults: 0,
//     showInfoAlert: true, // New state for controlling the display of the info alert
//     ratedMovies: [],
//     movieRatings: {}, // Store ratings with movie IDs
//   };
// 
// componentDidMount() {
//   window.addEventListener('online', this.updateNetworkStatus);
//   window.addEventListener('offline', this.updateNetworkStatus);
//   this.loadRatedMovies();
// }
// 
// // Load rated movies and ratings from localStorage
// loadRatedMovies = () => {
//   this.movieapi.getRatedMovies()
//     .then((ratedMovies) => {
//       const storedRatings = this.movieapi.getStoredRatings();
//       this.setState({ ratedMovies, movieRatings: storedRatings });
//     })
//     .catch((error) => this.setState({ error: 'Failed to load rated movies' }));
// };
// 
// 
// componentWillUnmount() {
//   window.removeEventListener('online', this.updateNetworkStatus);
//   window.removeEventListener('offline', this.updateNetworkStatus);
// }
// 
//   updateNetworkStatus = () => {
//     const isOffline = !navigator.onLine;
//     this.setState({ isOffline });
//   };
// 
//   fetchMovies(query, page = 1) {
//     this.setState({ isLoading: true, error: null, noResults: false });
// 
//     // Ensure we have a search query to fetch
//     if (!query) {
//       this.setState({ isLoading: false, noResults: true });
//       return;
//     }
// 
//     this.movieapi.searchMovies(query, page) // Pass page parameter
//       .then((data) => {
//         if (data.results.length === 0) {
//           this.setState({ noResults: true, isLoading: false });
//           setTimeout(() => {
//             this.setState({ noResults: false });
//           }, 5000);
//         } else {
//           this.setState({
//             movies: data.results,
//             isLoading: false,
//             noResults: false,
//             totalResults: data.total_results
//           });
//         }
// 
//         setTimeout(() => {
//           this.setState({ loadPosters: true });
//         }, 1000);
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch movies', isLoading: false });
//       });
//   }
// 
//   handleSearch = (query = '') => {
//     this.setState({ searchQuery: query, currentPage: 1, showInfoAlert: false });
//     this.fetchMovies(query); 
//   };
// 
//   handlePageChange = (page) => {
//     this.setState({ currentPage: page });
//     this.fetchMovies(this.state.searchQuery, page);
//   };
//   
//   handleRateMovie = (movieId, rating) => {
//     if (rating > 0) {
//       // Add rating
//       this.movieapi.addRating(movieId, rating);
//       this.setState((prevState) => ({
//         movieRatings: { ...prevState.movieRatings, [movieId]: rating },
//       }));
//     } else {
//       // Remove rating
//       this.movieapi.deleteRating(movieId);
//       this.setState((prevState) => {
//         const updatedRatings = { ...prevState.movieRatings };
//         delete updatedRatings[movieId];
//         return { movieRatings: updatedRatings };
//       });
//     }
//   };
// 
//   closeInfoAlert = () => {
//     this.setState({ showInfoAlert: false });
//   };
// 
//   render() {
//     const { movies, ratedMovies, error, isLoading, loadPosters, isOffline, noResults, currentPage, pageSize, totalResults, showInfoAlert } = this.state;
// 
//     if (isLoading) {
//       return <SpinnerLoader />;
//     }
// 
//     return (
//       <div className="app">
//         <FilterComponent className="filter-component"
//           ratedMovies={ratedMovies}
//           onSearch={this.handleSearch}
//           onPageChange={this.handlePageChange}
//           currentPage={currentPage}
//           pageSize={pageSize}
//           totalResults={totalResults}
//           onRate={this.handleRateMovie}  // Pass handleRateMovie to FilterComponent
//         />
//         {/* <SearchComponent className="search-component" onSearch={this.handleSearch} /> */}
//         <div>
//           {/* Info Alert displayed on load */}
//           {showInfoAlert && (
//             <Alert className="alert-message"
//               message="Type something in the search field. Use Rated to rate or look for."
//               type="info"
//               showIcon
//               closable
//               onClose={this.closeInfoAlert} // Close alert on click
//             />
//           )}
//           {isOffline && (
//             <Alert className="alert-message"
//               message="No network connection"
//               description="Check your router or reboot your computer. This page will reload automatically when you go online again."
//               type="error"
//               showIcon
//             />
//           )}
//           {error && (
//             <Alert className="alert-message"
//               message="Error"
//               description={error}
//               type="error"
//               showIcon
//               closable={false}
//             />
//           )}
//           {noResults && (
//             <Alert className="alert-message"
//               message="No search results"
//               type="warning"
//               showIcon
//             />
//           )}
//           <MovieCardsList 
//           movies={movies} 
//           loadPosters={loadPosters}
//            />
// 
//           {/* Conditionally render pagination if there are movies in the results */}
//           {movies.length > 0 && (
//             <Pagination
//               className="pagination"
//               current={currentPage}
//               pageSize={pageSize}
//               total={totalResults}
//               onChange={this.handlePageChange}
//               style={{ marginTop: '20px', textAlign: 'center' }}
//             />
//           )}
//         </div>
//       </div>
//     );
//   }
// }


// App.js
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
  
  // Load rated movies and ratings from localStorage
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
        <FilterComponent
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

// import React, { Component } from 'react';
// import MovieapiService from '../../api-service/movieapi.js';
// import SpinnerLoader from '../spinner-loader';
// import MovieCardsList from '../movie-cards-list';
// import FilterComponent from '../filter-component';
// import SearchComponent from '../search-component';
// import { Alert, Pagination } from 'antd';  // Import Pagination from antd
// import './app.css';
// 
// export default class App extends Component {
//   movieapi = new MovieapiService();
// 
//   state = {
//     movies: [],
//     error: null,
//     isLoading: true,
//     loadPosters: false,
//     isOffline: !navigator.onLine,
//     noResults: false,
//     searchQuery: '',
//     currentPage: 1, // Track the current page
//     pageSize: 10,   // Number of movies per page
//     totalResults: 0 // Total number of results for pagination
//   };
// 
//   componentDidMount() {
//     window.addEventListener('online', this.updateNetworkStatus);
//     window.addEventListener('offline', this.updateNetworkStatus);
// 
//     if (navigator.onLine) {
//       this.fetchMovies(); 
//     } else {
//       this.setState({ error: 'No network connection', isLoading: false });
//     }
//   }
// 
//   componentWillUnmount() {
//     window.removeEventListener('online', this.updateNetworkStatus);
//     window.removeEventListener('offline', this.updateNetworkStatus);
//   }
// 
//   updateNetworkStatus = () => {
//     const isOffline = !navigator.onLine;
//     this.setState({ isOffline });
// 
//     if (!isOffline && this.state.movies.length === 0) {
//       this.fetchMovies();
//     }
//   };
// 
//   fetchMovies(query, page = 1) {
//     this.setState({ isLoading: true, error: null, noResults: false });
// 
//     // If there's no search query, fetch trending movies instead
//     if (!query) {
//       this.fetchTrendingMovies(page);
//       return;
//     }
// 
//     this.movieapi.searchMovies(query, page) // Pass page parameter
//       .then((data) => {
//         if (data.results.length === 0) {
//           this.setState({ noResults: true, isLoading: false });
//           setTimeout(() => {
//             this.setState({ noResults: false });
//           }, 5000);
//         } else {
//           this.setState({
//             movies: data.results,
//             isLoading: false,
//             noResults: false,
//             totalResults: data.total_results // Set the total results for pagination
//           });
//         }
// 
//         setTimeout(() => {
//           this.setState({ loadPosters: true });
//         }, 1000);
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch movies', isLoading: false });
//       });
//   }
// 
//   fetchTrendingMovies = (page = 1) => {
//     this.setState({ isLoading: true, error: null });
//     
//     this.movieapi.getTrending(page) // Pass page parameter
//       .then((data) => {
//         this.setState({
//           movies: data.results,
//           isLoading: false,
//           noResults: data.results.length === 0,
//           totalResults: data.total_results // Set the total results for pagination
//         });
// 
//         if (data.results.length === 0) {
//           setTimeout(() => {
//             this.setState({ noResults: false });
//           }, 5000);
//         }
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch trending movies', isLoading: false });
//       });
//   };
// 
//   handleSearch = (query = '') => {
//     this.setState({ searchQuery: query, currentPage: 1 }); // Reset to page 1 on new search
//     this.fetchMovies(query); 
//   };
// 
//   handlePageChange = (page) => {
//     this.setState({ currentPage: page }); // Update current page in state
//     this.fetchMovies(this.state.searchQuery, page); // Fetch results for the new page
//   };
// 
//   render() {
//     const { movies, error, isLoading, loadPosters, isOffline, noResults, currentPage, pageSize, totalResults } = this.state;
// 
//     if (isLoading) {
//       return <SpinnerLoader />;
//     }
// 
//     return (
//       <div className="app">
//         {/* <button className="shadow-btn" onClick={() => this.fetchTrendingMovies(1)}>Show Current Trending Movies</button> */}
//         <FilterComponent />
//         <SearchComponent className="search-component" onSearch={this.handleSearch} />
//         <div>
//           {isOffline && (
//             <Alert
//               message="No network connection"
//               description="Check your router or reboot your computer. This page will reload automatically when you go online again."
//               type="error"
//               showIcon
//             />
//           )}
//           {error && (
//             <Alert
//               message="Error"
//               description={error}
//               type="error"
//               showIcon
//               closable={false}
//             />
//           )}
//           {noResults && (
//             <Alert
//               message="No search results"
//               type="warning"
//               showIcon
//             />
//           )}
//           <MovieCardsList movies={movies} loadPosters={loadPosters} />
//           
//           <Pagination className='pagination'
//             current={currentPage}
//             pageSize={pageSize}
//             total={totalResults}
//             onChange={this.handlePageChange} // Update page on change
//             style={{ marginTop: '20px', textAlign: 'center' }}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// работает!
// import React, { Component } from 'react';
// import MovieapiService from '../../api-service/movieapi.js';
// import SpinnerLoader from '../spinner-loader';
// import MovieCardsList from '../movie-cards-list';
// import FilterComponent from '../filter-component';
// import SearchComponent from '../search-component';
// import { Alert } from 'antd';
// import './app.css';
// 
// export default class App extends Component {
//   movieapi = new MovieapiService();
// 
//   state = {
//     movies: [],
//     error: null,
//     isLoading: true,
//     loadPosters: false,
//     isOffline: !navigator.onLine,
//     noResults: false,
//     searchQuery: '',
//   };
// 
//   componentDidMount() {
//     window.addEventListener('online', this.updateNetworkStatus);
//     window.addEventListener('offline', this.updateNetworkStatus);
// 
//     if (navigator.onLine) {
//       this.fetchMovies(); 
//     } else {
//       this.setState({ error: 'No network connection', isLoading: false });
//     }
//   }
// 
//   componentWillUnmount() {
//     window.removeEventListener('online', this.updateNetworkStatus);
//     window.removeEventListener('offline', this.updateNetworkStatus);
//   }
// 
//   updateNetworkStatus = () => {
//     const isOffline = !navigator.onLine;
//     this.setState({ isOffline });
// 
//     if (!isOffline && this.state.movies.length === 0) {
//       this.fetchMovies();
//     }
//   };
// 
//   fetchMovies(query) {
//     this.setState({ isLoading: true, error: null, noResults: false });
// 
//     // If there is no search query, fetch trending movies
//     if (!query) {
//       this.fetchTrendingMovies();
//       return;
//     }
// 
//     this.movieapi.searchMovies(query)
//       .then((data) => {
//         if (data.results.length === 0) {
//           this.setState({ noResults: true, isLoading: false });
//           setTimeout(() => {
//             this.setState({ noResults: false });
//           }, 5000);
//         } else {
//           this.setState({ movies: data.results, isLoading: false, noResults: false });
//         }
// 
//         setTimeout(() => {
//           this.setState({ loadPosters: true });
//         }, 1000);
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch movies', isLoading: false });
//       });
//   }
// 
//   // Adjusted method to fetch trending movies through MovieapiService
//   fetchTrendingMovies = () => {
//     this.setState({ isLoading: true, error: null });
//     
//     this.movieapi.getTrending()
//       .then((data) => {
//         this.setState({
//           movies: data.results,
//           isLoading: false,
//           noResults: data.results.length === 0,
//         });
// 
//         if (data.results.length === 0) {
//           setTimeout(() => {
//             this.setState({ noResults: false });
//           }, 5000);
//         }
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch trending movies', isLoading: false });
//       });
//   };
// 
//   handleSearch = (query = '') => {
//     this.setState({ searchQuery: query });
//     this.fetchMovies(query); // Call fetchMovies with the query
//   };
// 
//   render() {
//     const { movies, error, isLoading, loadPosters, isOffline, noResults } = this.state;
// 
//     if (isLoading) {
//       return <SpinnerLoader />;
//     }
// 
//     return (
//       <div className="app">
//         <button className="shadow-btn" onClick={this.fetchTrendingMovies}>Show Current Trending Movies</button>
//         <FilterComponent />
//         <SearchComponent className="search-component" onSearch={this.handleSearch} />
//         <div>
//           {isOffline && (
//             <Alert
//               message="No network connection"
//               description="Check your router or reboot your computer. This page will reload automatically when you go online again."
//               type="error"
//               showIcon
//             />
//           )}
//           {error && (
//             <Alert
//               message="Error"
//               description={error}
//               type="error"
//               showIcon
//               closable={false}
//             />
//           )}
//           {noResults && (
//             <Alert
//               message="No search results"
//               type="warning"
//               showIcon
//             />
//           )}
//           <MovieCardsList movies={movies} loadPosters={loadPosters} />
//         </div>
//       </div>
//     );
//   }
// }

//////// 29-10-2024
// import React, { Component } from 'react';
// import MovieapiService from '../../api-service/movieapi.js';
// import SpinnerLoader from '../spinner-loader';
// import MovieCardsList from '../movie-cards-list';
// import FilterComponent from '../filter-component';
// import SearchComponent from '../search-component';
// import { Alert } from 'antd';
// import './app.css';
// 
// export default class App extends Component {
//   movieapi = new MovieapiService();
// 
//   state = {
//     movies: [],
//     error: null,
//     isLoading: true,
//     loadPosters: false,
//     isOffline: !navigator.onLine, 
//     noResults: false,
//     searchQuery: '', 
//   };
// 
//   componentDidMount() {
//     // Adding network status listeners
//     window.addEventListener('online', this.updateNetworkStatus);
//     window.addEventListener('offline', this.updateNetworkStatus);
// 
//     if (navigator.onLine) {
//       this.fetchMovies(); 
//     } else {
//       this.setState({ error: 'No network connection', isLoading: false });
//     }
//   }
// 
//   componentWillUnmount() {
//     window.removeEventListener('online', this.updateNetworkStatus);
//     window.removeEventListener('offline', this.updateNetworkStatus);
//   }
// 
//   updateNetworkStatus = () => {
//     const isOffline = !navigator.onLine;
//     this.setState({ isOffline });
// 
//     if (!isOffline && this.state.movies.length === 0) {
//       this.fetchMovies();
//     }
//   };
// 
//   fetchMovies(query) {
//     this.setState({ isLoading: true, error: null, noResults: false });
//     this.movieapi.searchMovies(query)
//       .then((data) => {
//         if (data.results.length === 0) {
//           this.setState({ noResults: true, isLoading: false });
//           setTimeout(() => {
//             this.setState({ noResults: false });
//           }, 5000);
//         } else {
//           this.setState({ movies: data.results, isLoading: false, noResults: false });
//         }
// 
//         setTimeout(() => {
//           this.setState({ loadPosters: true });
//         }, 1000);
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch movies', isLoading: false });
//       });
//   }
// 
//   // New method to fetch trending movies
//   fetchTrendingMovies = () => {
//     this.setState({ isLoading: true, error: null });
//     
//     fetch('https://api.themoviedb.org/3/trending/all/day?api_key=d0fe716841fe3be4fc20d2546bbedc18')
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({
//           movies: data.results,
//           isLoading: false,
//           noResults: data.results.length === 0
//         });
// 
//         if (data.results.length === 0) {
//           setTimeout(() => {
//             this.setState({ noResults: false });
//           }, 5000);
//         }
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch trending movies', isLoading: false });
//       });
//   };
// 
//   handleSearch = (query = 'return') => {
//     this.setState({ searchQuery: query }); // Set the current search query
//     if (query) {
//       this.fetchMovies(query); // Fetch movies based on the query
//     } else {
//       this.fetchMovies(); // Fetch default movies if the search query is empty
//     }
//   };
// 
//   render() {
//     const { movies, error, isLoading, loadPosters, isOffline, noResults, searchQuery } = this.state;
// 
//     if (isLoading) {
//       return <SpinnerLoader />;
//     }
// 
//     return (
//       <div className="app">
//         <button className="shadow-btn" onClick={this.fetchTrendingMovies}>Show Current Trending Movies</button> {/* Button to fetch trending movies */}
//         <FilterComponent />
//         <SearchComponent className="search-component" onSearch={this.handleSearch} /> {/* Always visible */}
//         <div>
//           
//           {isOffline && (
//             <Alert
//               message="No network connection"
//               description="Check your router or reboot your computer. This page will reload automatically when you go online again."
//               type="error"
//               showIcon
//             />
//           )}
//           {error && (
//             <Alert
//               message="Error"
//               description={error}
//               type="error"
//               showIcon
//               closable={false} // Making sure the error is not closable
//             />
//           )}
//           {noResults && (
//             <Alert
//               message="No search results"
//               type="warning"
//               showIcon
//             />
//           )}
//           <MovieCardsList movies={movies} loadPosters={loadPosters} />
//         </div>
//       </div>
//     );
//   }
// }


///////////////////////////////////
// import React, { Component } from 'react';
// import MovieapiService from '../../api-service/movieapi.js';
// import SpinnerLoader from '../spinner-loader';
// import MovieCardsList from '../movie-cards-list';
// import FilterComponent from '../filter-component';
// import SearchComponent from '../search-component';
// import { Alert } from 'antd';
// import './app.css';
// 
// export default class App extends Component {
//   movieapi = new MovieapiService();
// 
//   state = {
//     movies: [],
//     error: null,
//     isLoading: true,
//     loadPosters: false,
//     isOffline: !navigator.onLine, 
//     noResults: false,
//   };
// 
//   componentDidMount() {
// 
//     window.addEventListener('online', this.updateNetworkStatus);
//     window.addEventListener('offline', this.updateNetworkStatus);
// 
//     if (navigator.onLine) {
//       this.fetchMovies();
//     } else {
//       this.setState({ error: 'No network connection', isLoading: false });
//     }
//   }
// 
//   componentWillUnmount() {
//     window.removeEventListener('online', this.updateNetworkStatus);
//     window.removeEventListener('offline', this.updateNetworkStatus);
//   }
// 
//   // Метод для обновления статуса сети
//   updateNetworkStatus = () => {
//     const isOffline = !navigator.onLine;
//     this.setState({ isOffline });
// 
//     if (!isOffline && this.state.movies.length === 0) {
//       // Если сеть восстановлена и фильмы еще не загружены, загружаем их
//       this.fetchMovies();
//     }
//   };
// 
// fetchMovies(query = 'return') {
//     this.setState({ isLoading: true, error: null, noResults: false });
//     this.movieapi.searchMovies(query)
//       .then((data) => {
//         if (data.results.length === 0) {
//           this.setState({ noResults: true, isLoading: false });
//   
//      
//           setTimeout(() => {
//             this.setState({ noResults: false });
//           }, 5000);
//         } else {
//           this.setState({ movies: data.results, isLoading: false, noResults: false });
//         }
//       
//         setTimeout(() => {
//           this.setState({ loadPosters: true });
//         }, 1000);
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch movies', isLoading: false });
//       });
//   }
// 
// //   fetchMovies() {
// //     this.setState({ isLoading: true, error: null });
// //     this.movieapi.searchMovies('return')
// //       .then((data) => {
// //         this.setState({ movies: data.results, isLoading: false });
// // 
// //         setTimeout(() => {
// //           this.setState({ loadPosters: true });
// //         }, 1000);
// //       })
// //       .catch((error) => {
// //         this.setState({ error: 'Failed to fetch movies', isLoading: false });
// //       });
// //   }
//   // метод для поиска фильмов, соединяемый с компонентом Поиска
//   handleSearch = (query) => {
//     if (query) {
//       this.fetchMovies(query);
//     } else {
//       this.fetchMovies(); // Fetch default movies if the search query is empty
//     }
//   };
// 
//   render() {
//     const { movies, error, isLoading, loadPosters, isOffline, noResults } = this.state;
// 
//     if (isLoading) {
//       return <SpinnerLoader />;
//     }
// 
//     return (
//       <div className="app">
//         <FilterComponent />
//         <SearchComponent onSearch={this.handleSearch} />
//         <div>
//           <h1>MoviesApp</h1>
//           {isOffline && (
//             <Alert
//               message="No network connection"
//               description="Check your router or reboot your computer. This page will reload automatically when you go online again."
//               type="error"
//               showIcon
//             />
//           )}
//           {error && (
//             <Alert
//               message="Error"
//               description={error}
//               type="error"
//               showIcon
//               closable={false} 
//             />
//           )}
//           {noResults && (
//             <Alert
//               message="No search results"
//               type="warning"
//               showIcon
//             />
//           )}
//           <MovieCardsList movies={movies} loadPosters={loadPosters} />
//         </div>
//       </div>
//     );
//   }
// }
///////////////////////

  // componentDidMount() {
//   this.movieapi.searchMovies('return')
//     .then((data) => {
//       this.setState({ movies: data.results, isLoading: false });
//       // Set a timeout to load posters after 5 seconds
//       setTimeout(() => {
//         this.setState({ loadPosters: true });
//       }, 5000);
//     })
//     .catch((error) => {
//       this.setState({ error: 'Failed to fetch movies', isLoading: false });
//     });
// }
///////////////////////////////////////////////////////
// import React, { Component } from 'react';
// import { format } from 'date-fns'; 
// 
// import FilterComponent from '../filter-component';
// import SearchComponent from '../search-component';
// import MovieCardsList from '../movie-cards-list';
// import MovieapiService from '../../api-service/movieapi.js';
// import SpinnerLoader from '../spinner-loader';
// 
// import './app.css';
// 
// 
// function reduceTextSize(text, maxLength) {
//   if (text.length <= maxLength) {
//     return text;
//   }
//   const reducedTextLength = text.slice(0, maxLength);
//   return reducedTextLength.slice(0, reducedTextLength.lastIndexOf(' ')) + '...';
// }
// 
// 
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
// // Для пустых изображений, когда нет постера
// const placeholderStyle = {
//   width: '200px',
//   height: '300px',
//   backgroundColor: 'white',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// };
// 
// export default class App extends Component {
// 
//   movieapi = new MovieapiService();
// 
//   state = {
//     movies: [],
//     error: null,
//     isLoading: true,
//   };
// 
//   componentDidMount() {
//     this.movieapi.searchMovies('return')
//       .then((data) => {
//         this.setState({ movies: data.results, isLoading: false }); 
//         
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to fetch movies', isLoading: false }); 
//       });
//   }
// 
//   render() {
//     const { movies, error, isLoading } = this.state;
//     
//     if (isLoading) {
//       return <SpinnerLoader />; // Show SpinnerLoader if loading
//     }
//     return (
//       <div>
//         <FilterComponent />
//         <SearchComponent />
//         <div>
//           <h1>MoviesApp</h1>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <ul>
//             {movies.map(movie => (
//               <li key={movie.id}>
//                 <h2>{movie.title}</h2>
//                 {movie.poster_path ? (
//                   <img
//                     src={`${IMAGE_BASE_URL}${movie.poster_path}`}
//                     alt={movie.title}
//                     style={{ width: '200px', height: '300px' }} 
//                   />
//                 ) : (
//                   <div style={placeholderStyle}>
//                     <span>Failed to find an Image</span>
//                   </div>
//                 )}
//                 <p>Release Date: {formatDate(movie.release_date)}</p> 
//                 <p>
//                   {movie.overview 
//                     ? reduceTextSize(movie.overview, 313) 
//                     : 'No information to be found in the database'}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }
//////////////////////////////////////////////////////////////
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
