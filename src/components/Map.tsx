import React, { useState } from 'react';
import GoogleMapReact, { ChildComponentProps } from 'google-map-react';
import logo from '../assets/img/logo.svg';

const Marker = ({ lat, lng }: ChildComponentProps) => (
  <div
    className="map__marker marker"
    style={{
      fontSize: 18,
      color: 'tomato',
    }}
    data-lat={lat}
    data-lng={lng}
  >
    <img className="marker__icon" src={logo} alt="123" />
  </div>
);

type MarkerType = {
  id: number;
  lat: number;
  lng: number;
  type: string;
};

const DATA: MarkerType[] = [
  { id: 1, lat: 55.751667, lng: 37.617778, type: 'individual' },
  { id: 2, lat: 55.802322, lng: 37.660719, type: 'entity' },
  { id: 3, lat: 55.704172, lng: 37.605787, type: 'individual' },
  { id: 4, lat: 55.80155, lng: 37.472578, type: 'entity' },
];

export default function Map(): React.ReactElement {
  const [markers, setMarkers] = useState<MarkerType[]>(DATA);
  const [currentFilterType, setCurrentFilterType] = useState<string>('');

  // Временное решение без сервера
  const typeFilter = (type: string) => {
    if (type === currentFilterType) {
      return;
    }

    if (type === 'all') {
      setCurrentFilterType('all');
      setMarkers(DATA);
    } else {
      setCurrentFilterType(type);
      setMarkers(DATA.filter((marker) => marker.type === type));
    }
  };

  return (
    <section className="page__content map">
      <div className="container">
        <h2 className="map__title h2">география</h2>
        <div className="map__container">
          <GoogleMapReact defaultZoom={11} defaultCenter={{ lat: 55.751667, lng: 37.617778 }}>
            {markers.map((marker) => (
              <Marker key={marker.id} lat={marker.lat} lng={marker.lng} />
            ))}
          </GoogleMapReact>
          <div className="map__sort sort">
            <button className="sort__title text" type="button" onClick={() => typeFilter('entity')}>
              юрлица
            </button>
            <button
              className="sort__title text"
              type="button"
              onClick={() => typeFilter('individual')}
            >
              физлица
            </button>
            <button
              className="sort__title sort__title--all text"
              type="button"
              onClick={() => typeFilter('all')}
            >
              показать всё
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
