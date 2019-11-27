import React from 'react';
import PropTypes from 'prop-types';

const HotelRow = ({ hotel }) => (
  <tr>
      <td><img src={hotel.thumbUrl} alt={hotel.name} /></td>
      <td><a href={hotel.url} target="_blank">{hotel.name}</a></td>
      <td><p>{hotel.price ? `${hotel.price}円` : '空室なし'}</p></td>
      <td><p>{hotel.reviewAverage}</p></td>
      <td><p>{hotel.reviewCount}</p></td>
      <td><p>{hotel.distance}</p></td>
    </tr>
);

HotelRow.propTypes = {
  hotel: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      thumbUrl: PropTypes.string,
      price: PropTypes.number,
      reviewAverage: PropTypes.number,
      reviewCount: PropTypes.number,
      distance: PropTypes.number,

    }).isRequired,
};


export default HotelRow;
