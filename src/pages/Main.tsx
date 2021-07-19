import React from 'react';
import Instagram from '../components/Instagram';
import Map from '../components/Map';

export default function Main(): React.ReactElement {
  return (
    <main className="page">
      <h2 className="h2 page__content">Карусель 1</h2>
      <h2 className="h2 page__content">Карусель 2</h2>
      <Instagram />
      <Map />
    </main>
  );
}
