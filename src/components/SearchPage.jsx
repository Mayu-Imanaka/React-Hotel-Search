import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from '../containers/SearchForm';
// import GeocodeResult from './GeocodeResult';
// import Map from './Map';
// import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: this.getPlaceParam() || '東京タワー',
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      sortKey: 'price',
    };
  }

  componentDidMount() {
    // const place = this.getPlaceParam();
    // if (place) {
    //   this.startSearch(place);
    // }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;
    if (place && place.length > 0) {
      return place;
    }
    return null;
  }


  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

  handlePlaceSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch();
  }

  startSearch() {
    geocode(this.state.place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            return searchHotelByLocation(location);
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('Oops, There are no results!');
            break;
          }
          default: {
            this.setErrorMessage('Error happend');
          }
        }
        return [];
      })
      .then((hotels) => {
        this.setState({ hotels });
        this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
      })
      .catch(() => {
        this.setErrorMessage('Failed to connect');
      });
  }

  handleSortKeyChange(sortKey) {
    this.setState({ sortKey, hotels: sortedHotels(this.state.hotels, sortKey) });
  }

  render() {
    return (
      <div className="search-page">
        <h1 className="app__title">Hotel Search</h1>
        <SearchForm
          onSubmit={e => this.handlePlaceSubmit(e)}
        />
        {/*
        <div className="app__result">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>Hotel Search Result</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}

        />

          </div>
        </div >
                */}
      </div >
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
};

export default SearchPage;
