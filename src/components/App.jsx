import React, { Component } from 'react';
import css from './App.module.css';

import { fetchImgs } from '../Service/fetchImgs';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    results: [],
    isLoading: false,
    error: null,
    max_pages: 0,
    showModal: false,
    largeImageURL: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const input = form.elements.input.value;
    this.setState({ searchQuery: input, results: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    )
      this.fetchAPI();
  }

  fetchAPI = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetchImgs(this.state.searchQuery, this.state.page);

      this.setState(prevState => ({
        results: [...prevState.results, ...response.data.hits],
        max_pages: (response.data.total / 12).toFixed(0),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const {
      error,
      isLoading,
      results,
      max_pages,
      page,
      largeImageURL,
      showModal,
    } = this.state;

    if (error) {
      return <div>Oops, something went wrong</div>;
    }

    return (
      <div className={css.App}>
        <Searchbar submitFunc={this.handleSubmit}></Searchbar>
        <ImageGallery images={results} onClickImgs={this.onClickImage} />
        {isLoading && <Loader />}
        {max_pages > page ? (
          <Button incrementFunc={this.loadMore}></Button>
        ) : (
          <span></span>
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
