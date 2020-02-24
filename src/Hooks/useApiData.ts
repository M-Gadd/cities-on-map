import api from "../api";
import { useState, useEffect } from "react";

export const useApiData = (city: string) => {
  const [showingCities, setShowingCities] = useState(Array);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const latandlng = await api.getLatLngByCity(city);
      setLat(latandlng.results[0].geometry.location.lat);
      setLng(latandlng.results[0].geometry.location.lng);

      const cities = await api.getNearByCities(
        latandlng.results[0].geometry.location.lat,
        latandlng.results[0].geometry.location.lng,
      );

      cities.geonames.forEach(async (one: any) => {
        const temp = await api.getCityTempreture(one.lat, one.lng);
        const city = {
          name: one.name,
          population: one.population,
          distance: one.distance,
          temperature: temp.currently.temperature,
          lat: one.lat,
          lng: one.lng,
        };
        setShowingCities((showingCities: any) => [...showingCities, city]);
        setIsLoading(false);
      });
    };
    fetchData();
  }, [city]);
  return { showingCities, isLoading, lat, lng };
};
