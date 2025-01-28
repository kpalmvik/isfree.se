const SearchForm = () => (
  <form action="search/domain" method="get" className="search-form">
    <label className="search-form__label" htmlFor="search-domain">
      <span className="search-form__prefix" aria-hidden="true">
        isfree.se/
      </span>
      <span className="sr-only">Sök efter .se-domän</span>
      <input
        type="text"
        name="domain"
        id="search-domain"
        className="search-form__input"
        placeholder="example"
        required
        pattern="[\p{L}0-9-]{1,61}"
        title="Endast bokstäver, siffror och bindestreck."
      />
    </label>
    <button className="search-form__submit">Sök</button>
  </form>
);

export default SearchForm;
