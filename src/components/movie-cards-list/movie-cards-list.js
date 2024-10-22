import React, { Component } from 'react';
import './movie-cards-list.css';

//import MovieCard from '../movie-card-component';

// 1. Подключение Movie-Card
// 2. Фетч с API и заполнение списка карточек
// 3. Пагинация для карточек
// 4. Не забыть подключить поиск-компонент

export default class MovieCardsList extends Component {
  state = {
    itemName: null,
    itemInfo: null,
    genreType: null,
    ratingStars: null,
  };

  render() {
    return <div className="cards-list">
    <ul>
    <li>movie</li>
    <li>movie</li>
    <li></li>
    </ul></div>;
  }
}
