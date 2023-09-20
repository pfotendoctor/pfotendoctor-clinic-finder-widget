import React from 'react';
import '../App.css';
import UpsellingBox from './UpsellingBox';

export interface ClinicDetails {
  clinicServiceDetails: {
    id: number;
    name: string;
    street: string;
    houseNumber: string;
    zip: string;
    city: string;
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
        <img
          src={`${process.env.REACT_APP_CDN_URL}/arrow_left.svg`}
          alt={'arrow left'}
        />
        <div>Notdienstübersicht</div>
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
        {clinicService.phoneNumberRegular && (
          <>
            {window.innerWidth >= 668 && (
              <p>
                Telefon:{' '}
                <span className={'clinicDetails__buttonContainerPhoneDesktop'}>
                  {clinicService.phoneNumberRegular}
                </span>{' '}
              </p>
            )}
            {window.innerWidth <= 668 && (
              <a href={`tel:${clinicService.phoneNumberRegular}`}>Anrufen</a>
            )}
          </>
        )}
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
