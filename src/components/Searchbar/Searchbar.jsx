import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = props => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={props.submitFunc}>
        <button type="submit" className={css.SearchFormbutton}>
          <span className={css.SearchFormbuttonlabel}>Search</span>
        </button>

        <input
          className={css.SearchForminput}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = { submitFunc: PropTypes.func.isRequired };
