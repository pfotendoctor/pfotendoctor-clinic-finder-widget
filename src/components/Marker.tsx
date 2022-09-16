import React from 'react';
import { ClinicType } from './ClinicFinder';
import pin from '../../public/pin.svg';
import emergencyIconRing from '../../public/emergency_icon_ring.svg';
import markerInactive from '../../public/marker_inactive.png';
import markerActive from '../../public/marker_active.png';
import localClinic from '../../public/local_clinic.svg';

interface Props {
  key: number;
  id: number;
  type: ClinicType;
  lat: number;
  lng: number;
  toggleInfoCard: (id: number) => void;
  activeInfoCardId: number | null;
  hoveredMarker: number | null;
  clinic?: string;
}

export const Marker = (props: Props) => {
  if (props.id !== 0) {
    return (
      <div
        key={props.key}
        onClick={() => props.toggleInfoCard(props.id)}
        className={'marker'}
      >
        {props.type === ClinicType.custom && (
          <img src={pin} alt={'custom marker'} />
        )}
        {props.type === ClinicType.emergencyRing && (
          <div
            className={props.type === ClinicType.emergencyRing ? 'blob' : ''}
          >
            <img src={emergencyIconRing} alt={'emergency cross'} />
          </div>
        )}
        {props.type === ClinicType.clinic && (
          <img
            src={
              props.id === (props.activeInfoCardId || props.hoveredMarker)
                ? markerActive
                : markerInactive
            }
            alt={'marker'}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <img
          className={'positionMarker__clinic'}
          src={localClinic}
          alt={'local clinic'}
        />
        <div className={'positionMarker__tooltip'}>
          <div className={'positionMarker__tooltipText'}>{props.clinic}</div>
        </div>
      </div>
    );
  }
};
