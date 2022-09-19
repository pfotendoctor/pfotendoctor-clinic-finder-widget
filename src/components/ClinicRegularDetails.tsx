import React from 'react';
import '../App.css';

export interface OpeningHours {
  monday: { opensAt: string; closesAt: string } | {};
  tuesday: { opensAt: string; closesAt: string } | {};
  wednesday: { opensAt: string; closesAt: string } | {};
  thursday: { opensAt: string; closesAt: string } | {};
  friday: { opensAt: string; closesAt: string } | {};
  saturday: { opensAt: string; closesAt: string } | {};
  sunday: { opensAt: string; closesAt: string } | {};
}

export interface ClinicDetails {
  clinicServiceDetails: {
    id: number;
    name: string;
    street: string;
    houseNumber: string;
    zip: string;
    city: string;
    openingHours: OpeningHours;
    customerTodo: string;
    openingHoursEmergency: string;
    website: string;
    phoneNumberRegular: string;
  };
  backToList: () => void;
}

const ClinicRegularDetails = (props: ClinicDetails) => {
  const clinicService = props.clinicServiceDetails;
  return (
    <div className={'clinicDetails'}>
      <div
        onClick={props.backToList}
        className={'clinicDetails__redRowContainer'}
      >
        <img src={'https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/arrow_left.svg'} alt={'arrow left'} />
        <h3>Notdienstübersicht</h3>
      </div>
      <div className={'clinicDetails__detailContainer'}>
        <div className={'clinicDetails__detailContainer--title'}>
          {clinicService.name}
        </div>
        <div className={'clinicDetails__detailContainer--address'}>
          <div>{clinicService.street}</div>
          <div>{clinicService.houseNumber}</div>
        </div>
        <div className={'clinicDetails__detailContainer--address'}>
          <div>{clinicService.zip}</div>
          <div>{clinicService.city}</div>
        </div>
      </div>
      <div className={'clinicDetails__attentionContainer'}>
        <div className={'clinicDetails__attentionContainer--title'}>
          Vor ihrem Besuch
        </div>
        <div className={'clinicDetails__attentionContainer--info'}>
          {clinicService.customerTodo}
        </div>
      </div>
      <div className={'clinicDetails__buttonContainer'}>
        <a href={`tel:${clinicService.phoneNumberRegular}`}>Anrufen</a>
        <button
          onClick={() => {
            window.open(clinicService.website, '_blank');
          }}
        >
          Website öffnen
        </button>
      </div>
      <div className={'clinicDetails__emergencyInfo'}>
        <div className={'clinicDetails__emergencyInfo--title'}>
          Notdienst-Öffnungszeiten
        </div>
        <div className={'clinicDetails__emergencyInfo--info'}>
          {clinicService.openingHoursEmergency}
        </div>
      </div>
      <div className={'stroke'}></div>
      <div className={'clinicDetails__disclaimer'}>
        Alle Angaben wurden sorgfältig geprüft. Bitte überprüfen Sie diese
        dennoch vorab auf der Website des Notdienstes.
      </div>
    </div>
  );
};

export default ClinicRegularDetails;
