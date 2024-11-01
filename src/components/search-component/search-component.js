import React, { Component } from 'react';
import { debounce } from 'lodash';
import './search-component.css'; 

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '', 
    };

   
    this.debouncedSearch = debounce(this.handleSearch, 700);
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ query: value }); 
    this.debouncedSearch(value); 
  };

  handleSearch = (query) => {
    this.props.onSearch(query); 
  };

  render() {
    return (
      <div className="search-component">
        <input className="search"
          type="text"
          placeholder="Search the movie database..."
          value={this.state.query} 
          onChange={this.handleInputChange} 
        />
      </div>
    );
  }
}