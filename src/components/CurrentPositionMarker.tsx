import React from 'react';
import '../App.css';

interface Coordinates {
  lat: number;
  lng: number;
}

const CurrentPositionMarker = (props: Coordinates) => {
  return <div className={'positionMarker'}></div>;
};

export default CurrentPositionMarker;
