import React from 'react';
import { ErrorState, ProvidedAt } from './ClinicFinder';
import { InfoModal } from './InfoModal';

interface Footer {
  error: ErrorState;
  providedAt: ProvidedAt;
  toggleModal: (value: boolean) => void;
  showModal: boolean;
}

const Footer = (props: Footer) => {
  return (
    <>
      <div
        className={
          props.providedAt === ProvidedAt.pfotendoctor
            ? 'container__footerInternal'
            : 'container__footer'
        }
      >
        <div className={'clinicDetails__emergencyInfo--title'}>
          {props.error && (
            <h2>In der Zwischenzeit online einen Tierarzt sprechen</h2>
          )}
        </div>
        {props.providedAt === ProvidedAt.external && (
          <>
            <div>
              <p>
                Die erfahrenen Tierärzte von Pfotendoctor können Ihnen innerhalb
                weniger Minuten eine erste Einschätzung bieten und Sie zu den
                nächsten Schritten beraten.
              </p>
            </div>
            <button
              className={'container__footer--button'}
              onClick={() => window.open('https://pfotendoctor.de', '_blank')}
            >
              <img
                src={`${process.env.REACT_APP_CDN_URL}/video_icon.svg`}
                alt={'video call icon'}
              />
              <div>Jetzt Videosprechstunde buchen</div>
            </button>
          </>
        )}
        {props.providedAt === ProvidedAt.pfotendoctor && (
          <>
            <div className={'container__footer--description'}>
              <p className="marginBottom">
                <span className={'clinicDetails__redText'}>
                  Notfälle sind lebensbedrohliche Situationen.
                </span>{' '}
                Sollte dein Haustier verunglückt sein, stark bluten oder sich
                anderweitig besorgniserregend verhalten, kontaktiere außerhalb
                der Praxis-Öffnungszeiten bitte einen der aufgeführten
                Notdienste.
              </p>
              <p>
              Unsere Tierärzte stehen in wenigen Minuten per Telefon{' '}
                <span className={'container__footer--link'}>
                  <a href={'tel:+498007777444'}>0800 7777 444</a>
                </span>{' '}
                oder Video zur Verfügung.
              </p>
            </div>
          </>
        )}
      </div>
      {props.providedAt === ProvidedAt.external && (
        <>
          <div className={'container__footer--infoContainer'}>
            <div
              onClick={() => {
                props.toggleModal(true);
              }}
              className={'container__footer--infoBox'}
            >
              <img
                src={`${process.env.REACT_APP_CDN_URL}/pd-logo.svg`}
                alt={'info icon'}
              />
              <div className={'container__footer--infoText'}>Informationen</div>
            </div>
          </div>
          {props.showModal && (
            <div
              className={'infoModalContainer'}
              onClick={() => {
                props.toggleModal(false);
              }}
            >
              <div onClick={e => e.stopPropagation()}>
                <InfoModal
                  closeModal={() => {
                    props.toggleModal(false);
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Footer;
