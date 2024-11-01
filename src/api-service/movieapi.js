export default class MovieapiService {

  _apiBase = 'https://api.themoviedb.org/3';


  _headers = {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTAzMmJiMmVmZmE5YjY2ZTNmZDEyZmVkZDI1ZDI1OSIsIm5iZiI6MTczMDQwMDY2Ni45NTE1MjksInN1YiI6IjY3MTdhZmUyNDVjZDY3NjIyMzU4OWViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1R9ZMsd9ySKHLsMzFym-VtO20gYPGHXeDyLMOOr8FAM'
  };


  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`, { headers: this._headers });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }


  searchMovies(query, page = 1) {
    return this.getResource(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`);
  }


  getMovie(id) {
    return this.getResource(`/movie/${id}`);
  }


  getMovieImages(id) {
    return this.getResource(`/movie/${id}/images`);
  }


  getImageUrl(imagePath) {
    return imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : null;
  }


  getTrending() {
    return this.getResource(`/trending/all/`);
  }


  addRating(movieId, ratingValue) {
    const ratings = this.getStoredRatings();
    ratings[movieId] = ratingValue;
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
    console.log(`Rated movie ${movieId} with ${ratingValue} stars`);
  }


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


  async getRatedMovies() {
    const ratings = this.getStoredRatings();
    const ratedMovies = [];

    for (const movieId in ratings) {
      try {
        const movieDetails = await this.getMovie(movieId);
        movieDetails.rating = ratings[movieId]; 
        ratedMovies.push(movieDetails);
      } catch (error) {
        console.error(`Error fetching details for rated movie ${movieId}:`, error);
      }
    }

    return ratedMovies;
  }


  getStoredRatings() {
    const ratings = localStorage.getItem('movieRatings');
    return ratings ? JSON.parse(ratings) : {};
  }
}


const movieapi = new MovieapiService();
export { movieapi };

