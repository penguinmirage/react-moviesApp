import React, { Component } from 'react';

import FilterComponent from '../filter-component';
import SearchComponent from '../search-component';
import MovieCardsList from '../movie-cards-list';

import './app.css';

export default class App extends Component {
  render() {
    return (
      <div className="movieapp">
        <FilterComponent />
        <SearchComponent />
        <MovieCardsList />
      </div>
    );
  }
}
