import React from 'react';
import { ClinicType } from './ClinicFinder';

interface Props {
  key: number;
  id: number;
  type: ClinicType;
  lat: number;
  lng: number;
  toggleInfoCard: (id: number) => void;
  activeInfoCardId: number;
  hoveredMarker: number;
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
          <img src={'pin.svg'} alt={'custom marker'} />
        )}
        {props.type === ClinicType.emergencyRing && (
          <div
            className={props.type === ClinicType.emergencyRing ? 'blob' : ''}
          >
            <img src={'emergency_icon_ring.svg'} alt={'emergency cross'} />
          </div>
        )}
        {props.type === ClinicType.clinic && (
          <img
            src={
              props.id === (props.activeInfoCardId || props.hoveredMarker)
                ? 'marker_active.png'
                : 'marker_inactive.png'
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
          src={'local_clinic.svg'}
          alt={'local clinic'}
        />
        <div className={'positionMarker__tooltip'}>
          <div className={'positionMarker__tooltipText'}>{props.clinic}</div>
        </div>
      </div>
    );
  }
};
