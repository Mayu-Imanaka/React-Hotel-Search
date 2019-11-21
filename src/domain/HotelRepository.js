import Rakuten from '../lib/Rakuten';

const RAKUTEN_APP_ID = '1094848202921756224';

// eslint-disable-next-line import/prefer-default-export
export const searchHotelByLocation = (location) => {
  const params = {
    applicationId: RAKUTEN_APP_ID,
    detumType: 1,
    latitude: location.lat,
    longitude: location.lng,
  };
  return Rakuten.Travel.simpleHotelSearch(params)
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log(result);
    });
};
