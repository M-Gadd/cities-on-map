import axios from "axios";

const MapsKepy = process.env.REACT_APP_GOOGLE_API;
const username = process.env.REACT_APP_GEONAME_USERNAME;
const DarkSkyKeyEnv = process.env.REACT_APP_DARK_KEY;

export default {
  async getLatLngByCity(city: string) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${MapsKepy}`,
    );
    return response.data;
  },

  async getNearByCities(lat: number, lng: number) {
    const response = await axios.get(
      `https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&cities=cities15000&radius=200&maxRows=4&username=${username}`,
    );
    return response.data;
  },

  async getCityTempreture(lat: number, lng: number) {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DarkSkyKeyEnv}/${lat},${lng}`,
    );
    return response.data;
  },
};
