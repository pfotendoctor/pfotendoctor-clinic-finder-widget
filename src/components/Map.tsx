// @ts-ignore
import React from 'react';
import { Marker } from './Marker';
import CurrentPositionMarker from './CurrentPositionMarker';
import GoogleMapReact from 'google-map-react';
import '../App.css';
import {
  ClinicService,
  ClinicType,
  GeoLocation,
  ProvidedAt,
} from './ClinicFinder';

interface Map {
  defaultProps: {
    center: {
      lat: number;
      lng: number;
    };
    zoom: number;
  };
  showCurrentPosition: boolean;
  customPosition: GeoLocation;
  lat: number;
  lng: number;
  activeClinicSiteId: number;
  hoveredMarker: number;
  clinic: string;
  showSearchMarker: boolean;
  userGeoLocation: GeoLocation;
  clinicServices: ClinicService[];
  toggleInfoCard: (value: number) => void;
  providedAt: ProvidedAt;
  showItemList: boolean;
  onHover: (id: number) => void
}

const Map = (props: Map) => {
  const {
    defaultProps,
    showCurrentPosition,
    customPosition,
    userGeoLocation,
    clinicServices,
  } = props;

  const OPTIONS = {
    minZoom: 9,
    maxZoom: 18,
  }

  // @ts-ignore
  return (
      <div className={props.showItemList ? 'mapContainerInactive': 'mapContainerActive'}>
        <GoogleMapReact
            options={OPTIONS}
            bootstrapURLKeys={{ key: 'AIzaSyCy22mfVK_HzEe6aYr-aV0YE-10qAcWSXQ' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            center={
              showCurrentPosition && customPosition
                  ? { lat: customPosition.lat, lng: customPosition.lng }
                  : null
            }
            yesIWantToUseGoogleMapApiInternals
        >

          {/*<Marker*/}
          {/*    key={0}*/}
          {/*    id={0}*/}
          {/*    type={ClinicType.clinic}*/}
          {/*    lat={props.lat}*/}
          {/*    lng={props.lng}*/}
          {/*    toggleInfoCard={() => {}}*/}
          {/*    activeInfoCardId={props.activeClinicSiteId}*/}
          {/*    hoveredMarker={props.hoveredMarker}*/}
          {/*    clinicName={props.clinic}*/}
          {/*    providedAt={props.providedAt}*/}
          {/*    onHover={(id) => props.onHover(id)}*/}

          {/*/>*/}
          {!props.showSearchMarker
              ? null
              : showCurrentPosition &&
              customPosition && (
                  <Marker
                      key={10000}
                      id={1}
                      type={ClinicType.custom}
                      lat={customPosition.lat}
                      lng={customPosition.lng}
                      toggleInfoCard={() => {}}
                      activeInfoCardId={null}
                      hoveredMarker={null}
                      providedAt={props.providedAt}
                      onHover={() => {}}
                  />
              )}
          {userGeoLocation && (
              <CurrentPositionMarker
                  lat={userGeoLocation.lat}
                  lng={userGeoLocation.lng}
              />
          )}
          {clinicServices &&
          clinicServices.map(clinicService => {
            return (
                <Marker
                    key={clinicService.id}
                    id={clinicService.id}
                    activeInfoCardId={props.activeClinicSiteId}
                    toggleInfoCard={id => {
                      props.toggleInfoCard(id);
                    }}
                    lat={clinicService.coordinatesLat}
                    lng={clinicService.coordinatesLong}
                    type={clinicService.type}
                    hoveredMarker={props.hoveredMarker}
                    providedAt={props.providedAt}
                    onHover={(id) => props.onHover(id)}
                />
            );
          })}
        </GoogleMapReact>
      </div>
  );
};

export default Map;
