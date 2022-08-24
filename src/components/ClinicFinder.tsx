import React, {useEffect, useRef, useState} from "react";
import { Marker } from './Marker'
import GoogleMapReact from 'google-map-react';
import '../App.css';
import axios from "axios";
import {Item} from "./Item";
import ClinicDetails from "./ClinicDetails";
import ClincDetailsEmergency from "./ClincDetailsEmergency";
import {InfoModal} from "./InfoModal";

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

export const testFkt = async (id) => {
    await axios.get(`http://127.0.0.1:3001/vet-practices/${id}`)
        .then((response) => {
            return response.data
        })
}

export default function ClinicFinder(props: Props){
    const [clinicServices ,setClinicServices] = useState<ClinicService[]>(null)
    const [activeInfoCardId, setActiveInfoCardId] = useState<number>(null)
    const [clinicServiceDetails, setClinicServiceDetails] = useState(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    if(activeInfoCardId) {
        console.log(clinicServiceDetails)
    }
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

    // NEAREST CLINICS

    const distanceBetweenCoordinates = (
        [lat1, lon1]: number[],
        [lat2, lon2]: number[],
        isMiles = false
    ) => {
        const toRadian = (angle: number) => (Math.PI / 180) * angle
        const distance = (a: number, b: number) => (Math.PI / 180) * (a - b)
        const RADIUS_OF_EARTH_IN_KM = 6371

        const dLat = distance(lat2, lat1)
        const dLon = distance(lon2, lon1)

        lat1 = toRadian(lat1)
        lat2 = toRadian(lat2)

        // Haversine Formula
        const a =
            Math.pow(Math.sin(dLat / 2), 2) +
            Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
        const c = 2 * Math.asin(Math.sqrt(a))

        let finalDistance = RADIUS_OF_EARTH_IN_KM * c

        if (isMiles) {
            finalDistance /= 1.60934
        }
        return finalDistance
    }

    const sortClinicsByDistance = (lat: number, long: number) => {
        return clinicServices.map((clinic, i) => {
            return {
                ...clinic,
                mapsIdentifier: i.toString(),
                distance: distanceBetweenCoordinates(
                    [lat, long],
                    [clinic.coordinatesLat, clinic.coordinatesLong]
                ),
            }
        }).sort((a, b) => {
            return a.distance - b.distance
        }).slice(0, 10)
    }

    const toggleInfoCard = (id:number) => {
        try {
            axios.get(`http://127.0.0.1:3001/vet-practices/${id}`)
                .then((response) => {
                    setActiveInfoCardId(id)
                    setClinicServiceDetails(response.data)
                })
        }
        catch(e) {console.log(e)}
    }

    const resetClinicService = () => {
        console.log("resetClinicService")
        setActiveInfoCardId(null)
    }

    const renderDetails = (clinic) => {
        if(clinicServiceDetails.type === ClinicType.emergencyRing) {
            return(
                <ClincDetailsEmergency
                    clinicServiceDetails={clinicServiceDetails}
                    backToList={() => {resetClinicService()}} />
            )
        } else {
           return (
               <ClinicDetails
                   clinicServiceDetails={clinicServiceDetails}
                   backToList={() => {resetClinicService()}} />
           )
        }
    }

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
            <div className={"container__bodyLeft"}>Notdienste in unserer Nähe</div>
            <div className={"container__body"}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCy22mfVK_HzEe6aYr-aV0YE-10qAcWSXQ" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    {clinicServices &&
                        clinicServices.map((clinicService) => {
                            return (
                                <Marker
                                    key={clinicService.id}
                                    id={clinicService.id}
                                    activeInfoCardId={activeInfoCardId}
                                    toggleInfoCard={(id) => {toggleInfoCard(id)}}
                                    lat={clinicService.coordinatesLat}
                                    lng={clinicService.coordinatesLong}
                                    type={clinicService.type}
                                />
                            )
                        })
                    }
                </GoogleMapReact>
                <div className={"container__bodyRight"}>
                    {(clinicServices && !activeInfoCardId) &&
                        sortClinicsByDistance(props.lat, props.lng).map(clinicService => {
                            return(
                                <div key={clinicService.id}>
                                   <Item
                                       id={clinicService.id}
                                       activeInfoCardId={activeInfoCardId}
                                       toggleInfoCard={(id) => {setActiveInfoCardId(id)}}
                                       setClinicServiceDetails={(clinic) => {setClinicServiceDetails(clinic)}}
                                   />
                                </div>
                            )
                        })
                    }
                    {(activeInfoCardId && activeInfoCardId === clinicServiceDetails?.id) &&
                        renderDetails(clinicServiceDetails)
                    }
                </div>
            </div>
            <div className={"container__footer"}>
                <div className={"clinicDetails__emergencyInfo--title"}>Nicht sicher, ob es sich um einen Notfall handelt?</div>
                <div>Die erfahrenen Tierärzte von Pfotendoctor können Ihnen innerhalb weniger Minuten eine erste Einschätzung bieten und Sie zu den nächsten Schritten beraten.</div>
                <button className={"container__footer--button"} onClick={() => window.open("https://pfotendoctor.de", "_blank")}>
                    <img src={"video_icon.svg"} alt={"video call icon"}/>
                    <div>Jetzt Videosprechstunde buchen</div>
                </button>
            </div>
            <div className={"container__footer--info"} onClick={() => {setShowModal(!showModal)}}>
                <img src={"info.svg"} alt={"info icon"}/>
            </div>
            {showModal &&
                <div className={"infoModalContainer"}>
                    <InfoModal closeModal={() => {setShowModal(false)}} />
                </div>
            }
        </div>
    );
}
