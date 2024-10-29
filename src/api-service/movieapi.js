export default class MovieapiService {
  // Base URL for the API
  _apiBase = 'https://api.themoviedb.org/3';

  // Method to fetch resources with authorization
  async getResource(url) {
  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTAzMmJiMmVmZmE5YjY2ZTNmZDEyZmVkZDI1ZDI1OSIsIm5iZiI6MTczMDIzMjIyNC4wMDM2NzUyLCJzdWIiOiI2NzE3YWZlMjQ1Y2Q2NzYyMjM1ODllYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tJQEKnTnekvMVBjhRTw2Fb7fFyz-voJ4aBdLisgmHck'
    }
  };
  const res = await fetch(`${this._apiBase}${url}`, options);

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
   
   getTrending(url) {
     return this.getResource(`https://api.themoviedb.org/3/trending/all/`);
   }
}

const movieapi = new MovieapiService();