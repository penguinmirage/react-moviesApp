export default class MovieapiService {
  // Base URL for the API
  _apiBase = 'https://api.themoviedb.org/3';

  // Authorization header setup
  _headers = {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTAzMmJiMmVmZmE5YjY2ZTNmZDEyZmVkZDI1ZDI1OSIsIm5iZiI6MTczMDQwMDY2Ni45NTE1MjksInN1YiI6IjY3MTdhZmUyNDVjZDY3NjIyMzU4OWViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1R9ZMsd9ySKHLsMzFym-VtO20gYPGHXeDyLMOOr8FAM'
  };

  // Method to fetch resources with authorization
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`, { headers: this._headers });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }

  // Method to get all movies based on a search query
  searchMovies(query, page = 1) {
    return this.getResource(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`);
  }

  // Method to get movie details by ID
  getMovie(id) {
    return this.getResource(`/movie/${id}`);
  }

  // Method to get movie images by ID
  getMovieImages(id) {
    return this.getResource(`/movie/${id}/images`);
  }

  // Helper method to construct the full image URL
  getImageUrl(imagePath) {
    return imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : null;
  }

  // Method to get trending movies
  getTrending() {
    return this.getResource(`/trending/all/`);
  }

  // Method to add or update a rating for a movie in localStorage
  addRating(movieId, ratingValue) {
    const ratings = this.getStoredRatings();
    ratings[movieId] = ratingValue;
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
    console.log(`Rated movie ${movieId} with ${ratingValue} stars`);
  }

  // Method to delete a rating for a movie in localStorage
  deleteRating(movieId) {
    const ratings = this.getStoredRatings();
    if (ratings[movieId]) {
      delete ratings[movieId];
      localStorage.setItem('movieRatings', JSON.stringify(ratings));
      console.log(`Deleted rating for movie ${movieId}`);
    } else {
      console.log(`No rating found for movie ${movieId} to delete.`);
    }
  }

  // Method to get all rated movies from localStorage
  async getRatedMovies() {
    const ratings = this.getStoredRatings();
    const ratedMovies = [];

    for (const movieId in ratings) {
      try {
        const movieDetails = await this.getMovie(movieId);
        movieDetails.rating = ratings[movieId]; // Include rating in movie details
        ratedMovies.push(movieDetails);
      } catch (error) {
        console.error(`Error fetching details for rated movie ${movieId}:`, error);
      }
    }

    return ratedMovies;
  }

  // Helper method to retrieve ratings from localStorage
  getStoredRatings() {
    const ratings = localStorage.getItem('movieRatings');
    return ratings ? JSON.parse(ratings) : {};
  }
}

// Initialize the service
const movieapi = new MovieapiService();
export { movieapi };


// // movieapi.js
// export default class MovieapiService {
//   // Base URL for the API
//   _apiBase = 'https://api.themoviedb.org/3';
// 
//   // Authorization header setup
//   _headers = {
//     accept: 'application/json',
//     'Content-Type': 'application/json;charset=utf-8',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTAzMmJiMmVmZmE5YjY2ZTNmZDEyZmVkZDI1ZDI1OSIsIm5iZiI6MTczMDQwMDY2Ni45NTE1MjksInN1YiI6IjY3MTdhZmUyNDVjZDY3NjIyMzU4OWViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1R9ZMsd9ySKHLsMzFym-VtO20gYPGHXeDyLMOOr8FAM'
//   };
// 
//   // Guest session ID storage
//   guestSessionId = null;
// 
//   constructor() {
//     // Create a guest session when instantiated
//     this.initGuestSession();
//   }
// 
//   // Initialize the guest session
//   async initGuestSession() {
//     const options = {
//       method: 'GET',
//       headers: this._headers
//     };
// 
//     try {
//       const res = await fetch(`${this._apiBase}/authentication/guest_session/new`, options);
//       const data = await res.json();
// 
//       if (data.success) {
//         this.guestSessionId = data.guest_session_id;
//         console.log('Guest session created:', this.guestSessionId);
//       } else {
//         throw new Error('Failed to create guest session');
//       }
//     } catch (error) {
//       console.error('Error initializing guest session:', error);
//     }
//   }
// 
//   // Method to fetch resources with authorization
//   async getResource(url) {
//     const res = await fetch(`${this._apiBase}${url}`, { headers: this._headers });
// 
//     if (!res.ok) {
//       throw new Error(`Could not fetch ${url}, received ${res.status}`);
//     }
// 
//     return await res.json();
//   }
// 
//   // Method to get all movies based on a search query
//   searchMovies(query, page = 1) {
//     return this.getResource(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`);
//   }
// 
//   // Method to get movie details by ID
//   getMovie(id) {
//     return this.getResource(`/movie/${id}`);
//   }
// 
//   // Method to get movie images by ID
//   getMovieImages(id) {
//     return this.getResource(`/movie/${id}/images`);
//   }
// 
//   // Helper method to construct the full image URL
//   getImageUrl(imagePath) {
//     return imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : null;
//   }
// 
//   // Method to get trending movies
//   getTrending() {
//     return this.getResource(`/trending/all/`);
//   }
// 
//   // Method to fetch rated movies for the guest session
//   async getRatedMovies() {
//     if (!this.guestSessionId) {
//       console.error('Guest session ID not found. Unable to fetch rated movies.');
//       return [];
//     }
// 
//     const url = `/guest_session/${this.guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`;
// 
//     try {
//       const data = await this.getResource(url);
//       return data.results || [];
//     } catch (error) {
//       console.error('Error fetching rated movies:', error);
//       return [];
//     }
//   }
// 
//   // Method to post ratings for a movie using the guest session
//   async addRating(movieId, ratingValue) {
//     if (!this.guestSessionId) {
//       console.error('Guest session ID not found. Unable to add rating.');
//       return;
//     }
// 
//     const url = `${this._apiBase}/movie/${movieId}/rating?guest_session_id=${this.guestSessionId}`;
//     const options = {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({ value: ratingValue })
//     };
// 
//     try {
//       const res = await fetch(url, options);
//       if (!res.ok) {
//         throw new Error(`Could not add rating to movie ${movieId}, received ${res.status}`);
//       }
// 
//       return await res.json();
//     } catch (error) {
//       console.error(`Error rating movie ${movieId}:`, error);
//     }
//   }
//   
//   // Method to delete a rating for a movie using the guest session
//   async deleteRating(movieId) {
//     if (!this.guestSessionId) {
//       console.error('Guest session ID not found. Unable to delete rating.');
//       return;
//     }
//   
//     const url = `${this._apiBase}/movie/${movieId}/rating?guest_session_id=${this.guestSessionId}`;
//     const options = {
//       method: 'DELETE',
//       headers: this._headers,
//     };
//   
//     try {
//       const res = await fetch(url, options);
//       if (!res.ok) {
//         throw new Error(`Could not delete rating for movie ${movieId}, received ${res.status}`);
//       }
//   
//       return await res.json();
//     } catch (error) {
//       console.error(`Error deleting rating for movie ${movieId}:`, error);
//     }
//   }
//   
// }
// 
// // Initialize the service
// const movieapi = new MovieapiService();
// export { movieapi };



// export default class MovieapiService {
//   // Base URL for the API
//   _apiBase = 'https://api.themoviedb.org/3';
// 
//   // Authorization header setup
//   _headers = {
//     accept: 'application/json',
//     'Content-Type': 'application/json;charset=utf-8',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTAzMmJiMmVmZmE5YjY2ZTNmZDEyZmVkZDI1ZDI1OSIsIm5iZiI6MTczMDQwMDY2Ni45NTE1MjksInN1YiI6IjY3MTdhZmUyNDVjZDY3NjIyMzU4OWViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1R9ZMsd9ySKHLsMzFym-VtO20gYPGHXeDyLMOOr8FAM'
//   };
// 
//   // Method to fetch resources with authorization
//   async getResource(url) {
//     const res = await fetch(`${this._apiBase}${url}`, { headers: this._headers });
// 
//     if (!res.ok) {
//       throw new Error(`Could not fetch ${url}, received ${res.status}`);
//     }
// 
//     return await res.json();
//   }
// 
//   // Method to post ratings for a movie
//   async addRating(movieId, ratingValue) {
//     const url = `${this._apiBase}/movie/${movieId}/rating`;
//     const options = {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({ value: ratingValue })
//     };
// 
//     const res = await fetch(url, options);
//     if (!res.ok) {
//       throw new Error(`Could not add rating to movie ${movieId}, received ${res.status}`);
//     }
// 
//     return await res.json();
//   }
// 
//   // Method to delete a rating for a movie
//   async deleteRating(movieId) {
//     const url = `${this._apiBase}/movie/${movieId}/rating`;
//     const options = {
//       method: 'DELETE',
//       headers: this._headers
//     };
// 
//     const res = await fetch(url, options);
//     if (!res.ok) {
//       throw new Error(`Could not delete rating for movie ${movieId}, received ${res.status}`);
//     }
// 
//     return await res.json();
//   }
// 
//   // Existing methods below...
// 
//   // Method to get all movies based on a search query
//   searchMovies(query, page = 1) {
//     return this.getResource(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`);
//   }
// 
//   // Method to get movie details by ID
//   getMovie(id) {
//     return this.getResource(`/movie/${id}`);
//   }
// 
//   // Method to get movie images by ID
//   getMovieImages(id) {
//     return this.getResource(`/movie/${id}/images`);
//   }
// 
//   // Helper method to construct the full image URL
//   getImageUrl(imagePath) {
//     return imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : null;
//   }
// 
//   // Method to get trending movies
//   getTrending() {
//     return this.getResource(`/trending/all/`);
//   }
// }
// 
// const movieapi = new MovieapiService();

// export default class MovieapiService {
//   // Base URL for the API
//   _apiBase = 'https://api.themoviedb.org/3';
// 
//   // Method to fetch resources with authorization
//   async getResource(url) {
//   const options = {
//     method: 'GET',
//     headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTAzMmJiMmVmZmE5YjY2ZTNmZDEyZmVkZDI1ZDI1OSIsIm5iZiI6MTczMDIzMjIyNC4wMDM2NzUyLCJzdWIiOiI2NzE3YWZlMjQ1Y2Q2NzYyMjM1ODllYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tJQEKnTnekvMVBjhRTw2Fb7fFyz-voJ4aBdLisgmHck'
//     }
//   };
//   const res = await fetch(`${this._apiBase}${url}`, options);
// 
//   if (!res.ok) {
//     throw new Error(`Could not fetch ${url}, received ${res.status}`);
//   }
// 
//   return await res.json();
//   }
// 
//   // Method to get all movies based on a search query
//   searchMovies(query, page = 1) {
//   return this.getResource(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`);
//   }
// 
//   // Method to get movie details by ID
//   getMovie(id) {
//   return this.getResource(`/movie/${id}`);
//   }
// 
//   // Method to get movie images by ID
//   getMovieImages(id) {
//   return this.getResource(`/movie/${id}/images`);
//   }
//    // Helper method to construct the full image URL
//    getImageUrl(imagePath) {
//      return imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : null;
//    }
//    
//    getTrending(url) {
//      return this.getResource(`https://api.themoviedb.org/3/trending/all/`);
//    }
// }
// 
// const movieapi = new MovieapiService();