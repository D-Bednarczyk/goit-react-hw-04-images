import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ incrementFunc }) => {
  return (
    <button className={css.Button} onClick={incrementFunc}>
      load more
    </button>
  );
};

Button.propTyupe = { incrementFunc: PropTypes.func };
