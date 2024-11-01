import React, { Component } from 'react';
import GenresContext from './GenresContext';
import MovieapiService from '../../api-service/movieapi.js';

export default class GenresProvider extends Component {
  constructor(props) {
	super(props);
	this.state = { genres: [] };
	this.movieapi = new MovieapiService();
  }

  componentDidMount() {
	this.fetchGenres();
  }

  fetchGenres = () => {
	this.movieapi.getGenres()
	  .then((genresData) => {
		const genres = genresData.genres || [];
		this.setState({ genres });
	  })
	  .catch((error) => console.error('Failed to fetch genres:', error));
  };

  render() {
	return (
	  <GenresContext.Provider value={{ genres: this.state.genres, fetchGenres: this.fetchGenres }}>
		{this.props.children}
	  </GenresContext.Provider>
	);
  }
}