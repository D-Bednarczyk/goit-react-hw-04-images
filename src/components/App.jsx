import { useState, useEffect } from 'react';
import css from './App.module.css';

import { fetchImgs } from '../Service/fetchImgs';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [max_pages, setMax_pages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargImageURL] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;

    setSearchQuery(form.elements.input.value);
    setResults([]);
    setPage(1);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setisLoading(true);
        const response = await fetchImgs(searchQuery, page);

        setResults(prevState => [...prevState, ...response.data.hits]);
        //setResults(response.data.hits);

        setMax_pages((response.data.total / 12).toFixed(0));
      } catch (error) {
        setError({ error });
      } finally {
        setisLoading(false);
      }
    };
    if (!searchQuery) return;
    fetchAPI();
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(prevValue => prevValue + 1);
  };

  const onClickImage = url => {
    setShowModal(true);
    setLargImageURL(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargImageURL('');
  };

  console.log(results);

  if (error) {
    return <div>Oops, something went wrong</div>;
  }

  return (
    <div className={css.App}>
      <Searchbar submitFunc={handleSubmit}></Searchbar>
      <ImageGallery images={results} onClickImgs={onClickImage} />
      {isLoading && <Loader />}
      {max_pages > page ? (
        <Button incrementFunc={loadMore}></Button>
      ) : (
        <span></span>
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
};
