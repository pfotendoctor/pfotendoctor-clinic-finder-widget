import React from 'react';
import { ClinicType, ProvidedAt } from './ClinicFinder';

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
  providedAt: ProvidedAt;
  onHover: (id: number) => void;
}

export const Marker = (props: Marker) => {
  if (props.id !== 0) {
    return (
      <div
        key={props.key}
        onClick={() => {
          props.toggleInfoCard(props.id);
        }}
        className={'marker'}
      >
        {props.type === ClinicType.custom && (
          <img
            src={`${process.env.REACT_APP_CDN_URL}/pin.svg`}
            alt={'custom marker'}
          />
        )}
        {props.type === ClinicType.emergencyRing && (
          <div>
            <img
              src={`${process.env.REACT_APP_CDN_URL}/marker_emergency.svg`}
              alt={'emergency cross'}
            />
            <div
              className={props.type === ClinicType.emergencyRing ? 'blob' : ''}
            ></div>
          </div>
        )}
        {props.type === ClinicType.clinic && (
          <img
            onMouseEnter={() => {
              props.onHover(props.id);
            }}
            onMouseLeave={() => {
              props.onHover(null);
            }}
            src={
              props.id === (props.activeInfoCardId || props.hoveredMarker)
                ? `${process.env.REACT_APP_CDN_URL}/marker-active.svg`
                : `${process.env.REACT_APP_CDN_URL}/marker-inactive.svg`
            }
            alt={props.clinicName}
          />
        )}
        {props.type === ClinicType.vetExtendedOpeningHours && (
          <img
            onMouseEnter={() => {
              props.onHover(props.id);
            }}
            onMouseLeave={() => {
              props.onHover(null);
            }}
            src={
              props.id === (props.activeInfoCardId || props.hoveredMarker)
                ? `${process.env.REACT_APP_CDN_URL}/marker-active.svg`
                : `${process.env.REACT_APP_CDN_URL}/marker-inactive.svg`
            }
            alt={props.clinicName}
          />
        )}
      </div>
    );
  } else {
    if (props.providedAt === ProvidedAt.external) {
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
    } else {
      return <></>;
    }
  }
};
