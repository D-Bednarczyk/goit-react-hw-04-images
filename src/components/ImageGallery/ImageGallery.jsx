import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClickImgs }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          largeImageURL={largeImageURL}
          alt={tags}
          onClickFunc={onClickImgs}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClickImgs: PropTypes.func.isRequired,
};
