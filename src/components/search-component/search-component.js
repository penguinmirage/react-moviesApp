import React, { Component } from 'react';
import { debounce } from 'lodash';
import './search-component.css'; // Include CSS for styling

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '', // Keep track of the current query
    };

    // Debounce the search function
    this.debouncedSearch = debounce(this.handleSearch, 700);
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ query: value }); // Update the query in the state
    this.debouncedSearch(value); // Call the debounced search function
  };

  handleSearch = (query) => {
    this.props.onSearch(query); // Pass the query to the parent component
  };

  render() {
    return (
      <div className="search-component">
        <input
          type="text"
          placeholder="Search the movie database..."
          value={this.state.query} // Keep the input field controlled
          onChange={this.handleInputChange} // Handle input changes
        />
      </div>
    );
  }
}