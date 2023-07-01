import axios from 'axios';

const API_KEY = '36133466-dbc0c7a3178523b048b6e9d9a';

const API_URL = 'https://pixabay.com/api/';
export const fetchImgs = (searchQuery, page) =>
  axios.get(
    `${API_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
