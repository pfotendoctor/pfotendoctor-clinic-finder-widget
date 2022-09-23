import React from 'react';
import '../App.css';
import { GeoLocation } from './ClinicFinder';

const CurrentPositionMarker = (props: GeoLocation) => {
  return <div className={'positionMarker'}></div>;
};

export default CurrentPositionMarker;
