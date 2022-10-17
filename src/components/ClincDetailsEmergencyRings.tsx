import React from 'react';
import { ClinicDetails } from './ClinicRegularDetails';

const ClincDetailsEmergencyRings = (props: ClinicDetails) => {
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
        <h3>Notdienstübersicht</h3>
      </div>
      <div className={'clinicDetails__detailContainer--title'}>
        {clinicService.name}
      </div>
      <div className={'clinicDetails__detailContainerBox'}>
        <div className={'clinicDetails__redRowContainer'}>
          <img
            src={`${process.env.REACT_APP_CDN_URL}/emergency_ring.svg`}
            alt={clinicService.name}
          />
          <div>Wichtiger Hinweis</div>
        </div>
        <div className={'clinicDetails__detailContainer--title'}>
          Der Notdienst wird von mehreren Praxen im Wechsel geleistet.
        </div>
        <div className={'clinicDetails__detailContainer--subTitle'}>
          Bitte informieren Sie sich unbedingt über den aktuellen Dienstplan.
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
              {clinicService.phoneNumberRegular &&
                <>
                    {window.innerWidth >= 668 &&
                      <p>Telefon: <span className={"clinicDetails__buttonContainerPhoneDesktop"}>{clinicService.phoneNumberRegular}</span> </p>
                    }
                    {window.innerWidth <= 668 &&
                      <a href={`tel:${clinicService.phoneNumberRegular}`}>Anrufen</a>
                    }
                </>
              }
              <button
                  onClick={() => {
                      window.open(clinicService.website, '_blank');
                  }}
              >
                  Website öffnen
              </button>
          </div>
      </div>
      <div className={'marginBottom'}>
        <div className={'clinicDetails__detailContainer--address'}>
          <div>{clinicService.street}</div>
          <div>{clinicService.houseNumber}</div>
        </div>
        <div className={'clinicDetails__detailContainer--address'}>
          <div>{clinicService.zip}</div>
          <div>{clinicService.city}</div>
        </div>
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

export default ClincDetailsEmergencyRings;
