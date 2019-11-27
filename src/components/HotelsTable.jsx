import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import HotelRow from './HotelRow';
import HotelsClickableTh from './HotelsClickableTh';

const HotelsTable = ({ hotels }) => (
  <table>
    <tbody>
      <tr>
        <th>Thumnail</th>
        <th>Hotel name</th>
        <HotelsClickableTh
          label="Price"
          sortKey="price"
        />
        <HotelsClickableTh
          label="Review"
          sortKey="reviewAverage"
        />
        <th>Num of review</th>
        <th>Distance</th>
      </tr>
      {hotels.map(hotel => (<HotelRow key={hotel.id} hotel={hotel} />))}
    </tbody>
  </table >
);

HotelsTable.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.any),
};

HotelsTable.defaultProps = {
  hotels: [],
};

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);


export default connect(
  state => ({
    hotels: sortedHotels(state.hotels, state.sortKey),
  }),
)(HotelsTable);

