
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Pagination } from 'antd';
import SearchComponent from '../search-component';
import MovieCardsList from '../movie-cards-list';
import './filter-component.css';

const { TabPane } = Tabs;

export default class FilterComponent extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    ratedMovies: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalResults: PropTypes.number.isRequired,
    onRate: PropTypes.func.isRequired,
    loadPosters: PropTypes.bool.isRequired,
    movieRatings: PropTypes.object.isRequired,
  };

  render() {
    const { movies, ratedMovies, onSearch, onPageChange, currentPage, pageSize, totalResults, onRate, loadPosters } = this.props;

    return (
      <div className="filter-component">
      
        <Tabs defaultActiveKey="1" className="centered-tabs" >
          <TabPane tab="Search" key="1">
            <SearchComponent onSearch={onSearch} />
            <MovieCardsList movies={movies} onRate={onRate} loadPosters={loadPosters} movieRatings={this.props.movieRatings} />
            {movies.length > 0 && (
              <Pagination className='pagination'
                current={currentPage}
                pageSize={pageSize}
                total={totalResults}
                onChange={onPageChange}
              />
            )}
          </TabPane>
          
          <TabPane tab="Rated" key="2">
            <MovieCardsList movies={ratedMovies} onRate={onRate} loadPosters={loadPosters} movieRatings={this.props.movieRatings} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

