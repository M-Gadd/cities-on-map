import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Map from "./Map";
import api from "../api";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const [location, setLocation] = useState("");
  const [mapInfo, setMapInfo] = useState("");

  const getNavigator = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const currentCity = await api.getNearByCities(
          position.coords.latitude,
          position.coords.longitude,
        );
        setMapInfo(currentCity.geonames[0].name);
      });
    }
  };

  return (
    <Row
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          setMapInfo(location);
          setLocation("");
        }
      }}
    >
      <Col xs={12}>
        <div className="mt-3">
          <input
            style={{ width: "60vw" }}
            value={location}
            onChange={(event) => {
              setMapInfo("");
              setLocation(event?.target.value);
            }}
            type="text"
            placeholder="Please enter location"
          />

          <Button
            onClick={() => {
              setMapInfo(location);
              setLocation("");
            }}
            className="ml-2  btn-dark"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              setMapInfo("");
              setLocation("");
              getNavigator();
            }}
            className="ml-2  btn-danger"
          >
            Get Current
          </Button>
        </div>

        <div>{mapInfo && <Map location={mapInfo} />}</div>
      </Col>
    </Row>
  );
};

export default Home;
