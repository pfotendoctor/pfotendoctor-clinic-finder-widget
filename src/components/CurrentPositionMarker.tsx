import React from 'react';
import '../App.css';

interface Props {
  lat: number;
  lng: number;
}

const CurrentPositionMarker = (props: Props) => {
  return <div className={'positionMarker'}></div>;
};

export default CurrentPositionMarker;
