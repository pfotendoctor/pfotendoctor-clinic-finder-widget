import React from 'react';
import { ClinicType } from './ClinicFinder';

interface Marker {
  key: number;
  id: number;
  type: ClinicType;
  lat: number;
  lng: number;
  toggleInfoCard: (id: number) => void;
  activeInfoCardId: number | null;
  hoveredMarker: number | null;
  clinicName?: string;
}

export const Marker = (props: Marker) => {
  if (props.id !== 0) {
    return (
      <div
        key={props.key}
        onClick={() => props.toggleInfoCard(props.id)}
        className={'marker'}
      >
        {props.type === ClinicType.custom && (
          <img
            src={`${process.env.REACT_APP_CDN_URL}/pin.svg`}
            alt={'custom marker'}
          />
        )}
        {props.type === ClinicType.emergencyRing && (
          <div
            className={props.type === ClinicType.emergencyRing ? 'blob' : ''}
          >
            <img
              src={`${process.env.REACT_APP_CDN_URL}/emergency_icon_ring.svg`}
              alt={'emergency cross'}
            />
          </div>
        )}
        {props.type === ClinicType.clinic && (
          <img
            src={
              props.id === (props.activeInfoCardId || props.hoveredMarker)
                ? `${process.env.REACT_APP_CDN_URL}/marker_active.svg`
                : `${process.env.REACT_APP_CDN_URL}/marker_inactive.svg`
            }
            alt={props.clinicName}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <img
          className={'positionMarker__clinic'}
          src={`${process.env.REACT_APP_CDN_URL}/local_clinic.svg`}
          alt={'local clinicName'}
        />
        <div className={'positionMarker__tooltip'}>
          <div className={'positionMarker__tooltipText'}>
            {props.clinicName}
          </div>
        </div>
      </div>
    );
  }
};
