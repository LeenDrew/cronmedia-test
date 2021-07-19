import React from 'react';
import Instagram from '../components/Instagram';
import Map from '../components/Map';

export default function Main(): React.ReactElement {
  return (
    <main className="page">
      <Instagram />
      <Map />
    </main>
  );
}
