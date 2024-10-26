export default class MovieapiService {
  // Base URL for the API
  _apiBase = 'https://api.themoviedb.org/3';

  // Method to fetch resources with authorization
  async getResource(url) {
  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmRiZmNiOGYwYzcwYjQ1ODViMWNjZDRiNDUwMTcxMCIsIm5iZiI6MTcyOTk3ODMwNS4wMTIzNzcsInN1YiI6IjY3MTdhZmUyNDVjZDY3NjIyMzU4OWViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gpFcGOyx0_AiQTCShmysg0JZ7WyMdJvtEvG6agsOB2o'
    }
  };
  const res = await fetch(`${this._apiBase}${url}`, options);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
  }

  // Method to get all movies based on a search query
  searchMovies(query) {
  return this.getResource(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
  }

  // Method to get movie details by ID
  getMovie(id) {
  return this.getResource(`/movie/${id}`);
  }

  // Method to get movie images by ID
  getMovieImages(id) {
  return this.getResource(`/movie/${id}/images`);
  }
}

const movieapi = new MovieapiService();