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
              <p>
                <span className={'clinicDetails__redText'}>
                  <b>Notfälle sind lebensbedrohliche Situationen.</b>
                </span>{' '}
                Sollte dein Haustier verunglückt sein, stark bluten oder sich
                anderweitig besorgniserregend verhalten, kontaktiere außerhalb
                der Praxis-Öffnungszeiten bitte einen der aufgeführten
                Notdienste.
              </p>
              <p>
                Nutze die{' '}
                <span className={'container__footer--link'}>
                  <a href={'https://pfotendoctor.de/termin-buchen-3'}>
                    <b>Notfall-Sprechstunde</b>
                  </a>
                </span>{' '}
                per Video oder Telefon, falls du Hilfe bei der Einschätzung
                deiner Situation brauchst.
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
