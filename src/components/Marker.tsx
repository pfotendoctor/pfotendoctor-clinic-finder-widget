import React, {useState} from "react";
import {ClinicType} from "./ClinicFinder";

interface Props {
    key: number,
    id: number
    type: ClinicType,
    lat: number,
    lng: number,
    toggleInfoCard: (id:number) => void
    activeInfoCardId: number
}

export const Marker = ( props: Props ) => {
    return (
        <div key={props.key} onClick={() => props.toggleInfoCard(props.id)}>
            {props.type === ClinicType.emergencyRing && <img src={"emergency_ring.svg"} alt={"emergency cross"}/>}
            {props.type === ClinicType.clinic && (
                <img src={props.id === props.activeInfoCardId ? "marker_active.png" : "marker_inactive.png"} alt={"marker"}/>
            )}
        </div>
    )
}
