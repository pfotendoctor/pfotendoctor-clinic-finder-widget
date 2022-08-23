import React from 'react';
import '../App.css';

export interface ClinicProps {
    clinicServiceDetails: {
        id: number;
        name: string;
        street: string;
        houseNumber: string;
        zip: string;
        city: string;
        openingHours: any;
        customerTodo: string;
        openingHoursEmergency: string;
    };
    backToList: () => void
}
const ClinicDetails = (props: ClinicProps) => {
    const clinicService = props.clinicServiceDetails
    console.log(props)
    return (
        <div className={"clinicDetails"}>
            <div onClick={props.backToList} className={"clinicDetails__redRowContainer"}>
                <img src={"arrow_left.svg"} alt={"arrow left"} />
                <div>Notdienstübersicht</div>
            </div>
            <div className={"clinicDetails__detailContainer"}>
                <div className={"clinicDetails__detailContainer--title"}>{clinicService.name}</div>
                <div className={"clinicDetails__detailContainer--address"}>
                    <div>{clinicService.street}</div>
                    <div>{clinicService.houseNumber}</div>
                </div>
                <div className={"clinicDetails__detailContainer--address"}>
                    <div>{clinicService.zip}</div>
                    <div>{clinicService.city}</div>
                </div>
            </div>
            <div className={"clinicDetails__attentionContainer"}>
                <div className={"clinicDetails__attentionContainer--title"}>Vor ihrem Besuch</div>
                <div className={"clinicDetails__attentionContainer--info"}>{clinicService.customerTodo}</div>
            </div>
            <div className={"clinicDetails__buttonContainer"}>
                <button>Anrufen</button>
                <button>Website öffnen</button>
            </div>
            <div className={"clinicDetails__emergencyInfo"}>
                <div className={"clinicDetails__emergencyInfo--title"}>Notdienst-Öffnungszeiten</div>
                <div className={"clinicDetails__emergencyInfo--info"}>{clinicService.openingHoursEmergency}</div>
            </div>
            <div className={"stroke"}></div>
            <div className={"clinicDetails__disclaimer"}>Alle Angaben wurden sorgfältig geprüft. Bitte überprüfen Sie diese dennoch vorab auf der Website des Notdienstes.</div>
        </div>
    );
};

export default ClinicDetails;
