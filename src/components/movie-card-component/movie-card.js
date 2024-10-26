// import React, { Component } from 'react';
// import './movie-card.css';
// import MovieapiService from '../../api-service/movieapi'
// export default class MovieCard extends Component {
//   
//   movieapi = new MovieapiService();
//   
//   // state = {
//   //   cover: null,
//   //   title: null,
//   //   genre: null,
//   //   info: null,
//   //   rating: null,
//   //   stars: null
//   // }
//   // 
//   // constructor() {
//   //   super();
//   //   this.searchMovieDB();
//   // }
//   // 
//   // searchMovieDB() {
//   //   this.movieApi.getMovie(7)
//   //   .then((movie) => {
//   //     this.setState({
//   //       title: movie.title,
//   //       genre: movie.genre,
//   //       info: movie.info,
//   //       rating: movie.rating,
//   //       stars: movie.stars
//   //     })
//   //   })
//   // }
//   
//   render() {
//     
//     // const {cover, title, genre, info, rating, stars } = this.state;
//     
//     return (
//       <div className="movie-card">
//       <img className="movie-cover" src="#" alt="movie cover image" />
//       <div className="movie-about">
//       <div className="movie-title">{title}</div>
//       <div className="movie-rating">{rating}</div>
//       <div className="movie-genre"><span>{genre}</span></div>
//       <div className="movie-info">{info}</div>
//       <div className="movie-stars">{stars}</div>
//       </div>
//       </div>
//     );
//   }
// }
