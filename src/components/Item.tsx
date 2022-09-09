import * as React from 'react';
import axios from "axios";
import {useEffect, useState} from "react";
import '../App.css';

type Props = {
    id: number,
    activeInfoCardId: number
    toggleInfoCard: (id:number) => void,
    toggleHoveredMarker: (id:number) => void,
    setClinicServiceDetails: (clinic) => void
};

export const Item = (props: Props) => {
    const [clinicService, setClinicService] = useState(null)

    const FetchClinicService = (id:number) => {
        try {
            axios.get(`http://127.0.0.1:3001/vet-practices/${id}`)
                .then((response) => {
                    setClinicService(response.data)
                })
        }
        catch(e) {console.log(e)}
    }

    useEffect(() => {
        FetchClinicService(props.id)
    },[props.id])

    const handleClinicServiceDetails = (id) => {
        props.toggleInfoCard(id)
        props.setClinicServiceDetails(clinicService)
    }

    return (
        <div>
            {clinicService &&
                <div
                    onClick={() => {handleClinicServiceDetails(props.id)}}
                    onMouseEnter={() => {props.toggleHoveredMarker(props.id)} }
                    onMouseLeave={() => {} }
                    className={"container__bodyRight--item"} >
                        <div className={"container__bodyRight--itemTitle"}><b>{clinicService.name}</b></div>
                        <div className={"container__bodyRight--itemActiveStreet"}>{clinicService.street} {clinicService.houseNumber}</div>
                        <div>{clinicService.city}</div>
                </div>
            }
        </div>
    );
};
