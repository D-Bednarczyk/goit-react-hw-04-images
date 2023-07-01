import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  modalClose = e => {
    if (e.keyCode === 27 || e.currentTarget === e.target) {
      return this.props.onModalClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.modalClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.modalClose, false);
  }

  render() {
    const { largeImageURL } = this.props;

    return (
      <div className={css.Overlay} onClick={this.modalClose}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="modal" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  onModalClose: PropTypes.func,
};
