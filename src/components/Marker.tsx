import React from 'react';
import { ClinicType } from './ClinicFinder';

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
          <img src={'https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/pin.svg'} alt={'custom marker'} />
        )}
        {props.type === ClinicType.emergencyRing && (
          <div
            className={props.type === ClinicType.emergencyRing ? 'blob' : ''}
          >
            <img src={'https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/emergency_icon_ring.svg'} alt={'emergency cross'} />
          </div>
        )}
        {props.type === ClinicType.clinic && (
          <img
            src={
              props.id === (props.activeInfoCardId || props.hoveredMarker)
                ? 'https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/marker_active.png'
                : 'https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/marker_inactive.png'
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
          src={'https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/local_clinic.svg'}
          alt={'local clinic'}
        />
        <div className={'positionMarker__tooltip'}>
          <div className={'positionMarker__tooltipText'}>{props.clinic}</div>
        </div>
      </div>
    );
  }
};
