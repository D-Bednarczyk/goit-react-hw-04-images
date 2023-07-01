import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, onModalClose }) => {
  const modalClose = e => {
    if (e.keyCode === 27 || e.currentTarget === e.target) {
      return onModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalClose, false);
    return () => document.removeEventListener('keydown', modalClose, false);
  }, [onModalClose]);

  return (
    <div className={css.Overlay} onClick={modalClose}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="modal" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  onModalClose: PropTypes.func,
};
