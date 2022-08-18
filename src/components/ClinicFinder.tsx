import React, { useEffect, useState } from "react";
import { Marker } from './Marker'
import GoogleMapReact from 'google-map-react';
import '../App.css';
import axios from "axios";

interface Props {
    lat: number;
    lng: number;
}

export enum ClinicType {
    clinic = "clinic",
    emergencyRing = "emergencyRing",
    vetExtendedOpeningHours = 'vetExtendedOpeningHours',
}

interface ClinicService {
    coordinatesLat: number;
    coordinatesLong: number;
    id: number;
    name: string;
    showInMobileApp: boolean;
    type: ClinicType;
}

export default function ClinicFinder(props: Props){
    const [clinicServices ,setClinicServices] = useState<ClinicService[]>(null)
    const [activeInfoCardId, setActiveInfoCardId] = useState<number>(null)

    console.log(clinicServices);
    const defaultProps = {
        center: {
            lat: props.lat,
            lng: props.lng
        },
        zoom: 10
    };

    const FetchClinicServices = () => {
        try {
            axios.get('http://127.0.0.1:3001/vet-practices')

            .then((response) => {
                setClinicServices(response.data)
            })
        }
        catch(e) {console.log(e)}
    }

    useEffect(() => {
        FetchClinicServices()
    },[])

    return (
        <div className={"container"}>
            <div className={"container__header"}>
                <div className={"container__headerLeft"}>
                    <span className={"emergencyText"}>Notfälle sind lebensbedrohliche Situationen.&nbsp;</span>
                    <span>Sollte Ihr Haustier verunglückt sein, stark bluten oder sich anderweitig besorgniserregend verhalten, kontaktieren Sie außerhalb der Praxis-Öffnungszeiten bitte umgehend einen der untenstehenden Notdienste.</span>
                </div>
                <div className={"container__headerRight"}>
                    <img src={"red_cross.png"} alt={"emergency cross"}/>
                </div>
            </div>
            <div className={"container__body"}>
                <div className={"container__bodyLeft"}></div>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCy22mfVK_HzEe6aYr-aV0YE-10qAcWSXQ" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    {clinicServices &&
                        clinicServices.map((clinicService) => {
                            return (
                                <Marker
                                    id={clinicService.id}
                                    activeInfoCardId={activeInfoCardId}
                                    toggleInfoCard={(id) => {setActiveInfoCardId(id)}}
                                    lat={clinicService.coordinatesLat}
                                    lng={clinicService.coordinatesLong}
                                    type={clinicService.type}
                                />
                            )
                        })
                    }
                </GoogleMapReact>
                <div className={"container__bodyRight"}>RIGHT</div>
            </div>
            <div className={"container__footer"}>FOOTER</div>
        </div>
    );
}
