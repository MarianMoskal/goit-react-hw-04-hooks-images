import { Fragment } from "react";
import PropTypes from "prop-types";
import { Header, SearchForm, Button, Label, Input } from "./Searchbar.styled";

function Searchbar({ onChange, onSubmit }) {
  return (
    <Fragment>
      <Header>
        <SearchForm onSubmit={onSubmit}>
          <Button type="submit">
            <Label>Search</Label>
          </Button>

          <Input
            className="SearchForm-input"
            id="textInput"
            type="text"
            onChange={onChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    </Fragment>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Searchbar;
