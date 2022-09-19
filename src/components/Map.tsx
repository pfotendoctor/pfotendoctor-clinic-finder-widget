import React from 'react';
import {Marker} from "./Marker";
import CurrentPositionMarker from "./CurrentPositionMarker";
import GoogleMapReact from "google-map-react";
import {ClinicService, ClinicType, GeoLocation} from "./ClinicFinder";

interface Map {
    defaultProps: {
        center: {
            lat: number,
            lng: number,
        },
        zoom: number,
    };
    positioning: boolean;
    customPosition: GeoLocation;
    lat: number;
    lng: number;
    activeClinicSiteId: number;
    hoveredMarker: number;
    clinic: string;
    showPin: boolean;
    userGeoLocation: GeoLocation;
    clinicServices: ClinicService[];
    toggleInfoCard: (value:number) => void;
}

const Map = (props: Map) => {
    const defaultProps = props.defaultProps
    const positioning = props.positioning
    const customPosition = props.customPosition
    const userGeoLocation = props.userGeoLocation
    const clinicServices = props.clinicServices

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCy22mfVK_HzEe6aYr-aV0YE-10qAcWSXQ' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            center={
                positioning && customPosition
                    ? { lat: customPosition.lat, lng: customPosition.long }
                    : null
            }
            yesIWantToUseGoogleMapApiInternals
        >
            <Marker
                key={0}
                id={0}
                type={ClinicType.clinic}
                lat={props.lat}
                lng={props.lng}
                toggleInfoCard={() => {}}
                activeInfoCardId={props.activeClinicSiteId}
                hoveredMarker={props.hoveredMarker}
                clinicName={props.clinic}
            />
            {!props.showPin
                ? null
                : positioning &&
                customPosition && (
                    <Marker
                        key={10000}
                        id={1}
                        type={ClinicType.custom}
                        lat={customPosition.lat}
                        lng={customPosition.long}
                        toggleInfoCard={() => {}}
                        activeInfoCardId={null}
                        hoveredMarker={null}
                    />
                )}
            {userGeoLocation && (
                <CurrentPositionMarker
                    lat={userGeoLocation.lat}
                    lng={userGeoLocation.long}
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
                    />
                );
            })}
        </GoogleMapReact>
    );
};

export default Map;
