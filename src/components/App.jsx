import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      lat: location.lat,
      lng: location.lng,
    });
  }

  handlePlaceSubmit(place) {
    axios
      .get(GEOCODE_ENDPOINT, { params: { address: place, key: 'AIzaSyC6Dzp2k3lzi-98_6oVHUu6Ux9pn92epGU' } })
      .then((results) => {
        const data = results.data;
        const result = results.data.results[0];
        switch (data.status) {
          case 'OK': {
            const location = result.geometry.location;
            this.setState({
              address: result.formatted_address,
              lat: location.lat,
              lng: location.lng,
            });
            break;
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('Oops, There are no results!');
            break;
          }
          default: {
            this.setErrorMessage('');
          }
        }
      })
      .catch((error) => {
      });
  }

  render() {
    return (
      <div>
        <h1>Latitude/Longtitude Search</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <GeocodeResult address={this.state.address} lat={this.state.lat} lng={this.state.lng} />
      </div>
    );
  }
}

export default App;
