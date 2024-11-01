// // FilterComponent.js
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Tabs, Pagination } from 'antd';
// import SearchComponent from '../search-component';
// import MovieCardsList from '../movie-cards-list';
// import './filter-component.css';
// 
// const { TabPane } = Tabs;
// 
// export default class FilterComponent extends Component {
//   static propTypes = {
//     movies: PropTypes.array.isRequired,
//     ratedMovies: PropTypes.array.isRequired,
//     onSearch: PropTypes.func.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     currentPage: PropTypes.number.isRequired,
//     pageSize: PropTypes.number.isRequired,
//     totalResults: PropTypes.number.isRequired,
//     onRate: PropTypes.func.isRequired, // onRate prop
//   };
// 
//   render() {
//     const { movies, ratedMovies, onSearch, onPageChange, currentPage, pageSize, totalResults, onRate } = this.props;
// 
//     return (
//       <div className="filter-component">
//         <Tabs defaultActiveKey="1">
//           <TabPane tab="Search" key="1">
//             <SearchComponent onSearch={onSearch} />
//             <MovieCardsList movies={movies} onRate={onRate} />  {/* Pass onRate */}
//             {movies.length > 0 && (
//               <Pagination
//                 current={currentPage}
//                 pageSize={pageSize}
//                 total={totalResults}
//                 onChange={onPageChange}
//                 style={{ marginTop: '20px', textAlign: 'center' }}
//               />
//             )}
//           </TabPane>
//           
//           <TabPane tab="Rated" key="2">
//             <MovieCardsList movies={ratedMovies} onRate={onRate} />  {/* Pass onRate */}
//           </TabPane>
//         </Tabs>
//       </div>
//     );
//   }
// }

// FilterComponent.js
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
        <Tabs defaultActiveKey="1">
          <TabPane tab="Search" key="1">
            <SearchComponent onSearch={onSearch} />
            <MovieCardsList movies={movies} onRate={onRate} loadPosters={loadPosters} movieRatings={this.props.movieRatings} />
            {movies.length > 0 && (
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalResults}
                onChange={onPageChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
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


// // FilterComponent.js
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Tabs, Pagination } from 'antd';  // Import Pagination
// import SearchComponent from '../search-component';
// import MovieCardsList from '../movie-cards-list';
// import './filter-component.css';
// 
// const { TabPane } = Tabs;
// 
// export default class FilterComponent extends Component {
//   static propTypes = {
//     movies: PropTypes.array.isRequired,
//     ratedMovies: PropTypes.array.isRequired,
//     onSearch: PropTypes.func.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     currentPage: PropTypes.number.isRequired,
//     pageSize: PropTypes.number.isRequired,
//     totalResults: PropTypes.number.isRequired,
//     onRate: PropTypes.func.isRequired, // Add onRate prop
//   };
// 
//   render() {
//     const { movies, ratedMovies, onSearch, onPageChange, currentPage, pageSize, totalResults, onRate } = this.props;
// 
//     return (
//       <div className="filter-component">
//         <Tabs defaultActiveKey="1">
//           {/* Search Tab */}
//           <TabPane tab="Search" key="1">
//             <SearchComponent onSearch={onSearch} />
//             <MovieCardsList movies={movies} onRate={onRate} />
//             {/* Pagination for Search Tab */}
//             {movies.length > 0 && (
//               <Pagination
//                 current={currentPage}
//                 pageSize={pageSize}
//                 total={totalResults}
//                 onChange={onPageChange}
//                 style={{ marginTop: '20px', textAlign: 'center' }}
//               />
//             )}
//           </TabPane>
//           
//           {/* Rated Tab */}
//           <TabPane tab="Rated" key="2">
//             <MovieCardsList movies={ratedMovies} onRate={onRate} />
//           </TabPane>
//         </Tabs>
//       </div>
//     );
//   }
// }




// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Tabs } from 'antd';
// import SearchComponent from '../search-component';
// import MovieCardsList from '../movie-cards-list';
// import './filter-component.css';
// 
// const { TabPane } = Tabs;
// 
// export default class FilterComponent extends Component {
//   static propTypes = {
//     movies: PropTypes.array.isRequired,
//     ratedMovies: PropTypes.array.isRequired,
//     onSearch: PropTypes.func.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     currentPage: PropTypes.number.isRequired,
//     pageSize: PropTypes.number.isRequired,
//     totalResults: PropTypes.number.isRequired,
//   };
// 
//   render() {
//     const { movies, ratedMovies, onSearch, onPageChange, currentPage, pageSize, totalResults } = this.props;
// 
//     return (
//       <div className="filter-component">
//         <Tabs defaultActiveKey="1">
//           {/* Search Tab */}
//           <TabPane tab="Search" key="1">
//             <SearchComponent onSearch={onSearch} />
//             <MovieCardsList movies={movies} />
//             {/* Pagination for Search Tab */}
//             {movies.length > 0 && (
//               <Pagination
//                 current={currentPage}
//                 pageSize={pageSize}
//                 total={totalResults}
//                 onChange={onPageChange}
//                 style={{ marginTop: '20px', textAlign: 'center' }}
//               />
//             )}
//           </TabPane>
//           
//           {/* Rated Tab */}
//           <TabPane tab="Rated" key="2">
//             <MovieCardsList movies={ratedMovies} />
//           </TabPane>
//         </Tabs>
//       </div>
//     );
//   }
// }

// import React, { Component } from 'react';
// import './filter-component';
// 
// export default class FilterComponent extends Component {
//   render() {
//     return <span>FilterComponent</span>;
//   }
// }
