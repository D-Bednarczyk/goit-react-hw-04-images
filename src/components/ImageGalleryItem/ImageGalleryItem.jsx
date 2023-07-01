import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, largeImageURL, alt, onClickFunc }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={() => onClickFunc(largeImageURL)}
        className={css.ImageGalleryItemimage}
        src={src}
        alt={alt}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};
