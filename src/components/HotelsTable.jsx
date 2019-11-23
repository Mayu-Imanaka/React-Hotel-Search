import React from 'react';
import PropTypes from 'prop-types';

import HotelRow from './HotelRow';
import HotelsClickableTh from './HotelsClickableTh';

const HotelsTable = ({ hotels, sortKey, onSort }) => (
  <table>
    <tbody>
      <tr>
        <th>Thumnail</th>
        <th>Hotel name</th>
        <HotelsClickableTh
          label="Price"
          sortKey="price"
          isSelected={sortKey === 'price'}
          onSort={key => onSort(key)}
        />
        <HotelsClickableTh
          label="Review"
          sortKey="reviewAverage"
          isSelected={sortKey === 'reviewAverage'}
          onSort={key => onSort(key)}
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
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

HotelsTable.defaultProps = {
  hotels: [],
};

export default HotelsTable;
