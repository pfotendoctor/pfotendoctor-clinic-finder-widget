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
        <div key={props.key} onClick={() => props.toggleInfoCard(props.id)} className={"marker"}>
            {props.type === ClinicType.emergencyRing &&
                <div className={props.type === ClinicType.emergencyRing ? "blob" : ""}>
                    <img
                        src={"notdienst.svg"}
                        alt={"emergency cross"}/>
                </div>
            }
            {props.type === ClinicType.clinic && (
                <img src={props.id === props.activeInfoCardId ? "marker_active.png" : "marker_inactive.png"} alt={"marker"}/>
            )}
        </div>
    )
}
