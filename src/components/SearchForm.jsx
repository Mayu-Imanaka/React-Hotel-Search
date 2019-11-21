import React, { Component, PropTypes } from 'react';

class SearchForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
          place: 'Tokyo tower',
        };
    }

  handlePlaceChange(place) {
      this.setState({ place });
    }

  handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state.place);
    }

  render() {
      return (
          <form onSubmit={e => this.handleSubmit(e)} className="searchForm">
              <input
                  className="searchForm__input"
                  type="text"
                  size="30"
                  value={this.state.place}
                  onChange={e => this.handlePlaceChange(e.target.value)}
                />
              <input type="submit" value="Search" className="searchForm__submit" />
            </form>
        );
    }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;

