import React from 'react';
import '../App.css';

interface Modal {
  closeModal: () => void;
}

export const InfoModal = (props: Modal) => {
  return (
    <div className={'infoModal'}>
      <div className={'infoModal__header'}>
        <div className={'clinicDetails__detailContainer--title'}>
          Informationen
        </div>
        <img
          onClick={props.closeModal}
          src={`${process.env.REACT_APP_CDN_URL}/close_icon.svg`}
          alt={'close modal'}
        />
      </div>
      <div className={'infoModal__body'}>
        <div>
          Dieses Notdienst-Widget wird entwickelt und kostenfrei bereitgestellt
          von
        </div>
        <div className={'infoModal__bodyBox'}>
          <img src={'https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/pd-logo.svg'} alt={'logo'} />
          <div className={'infoModal__bodyBox--title'}>Pfotendoctor</div>
          <div className={'infoModal__bodyBox--subTitle'}>
            Online-Tierarztbesuch per Smartphone
          </div>
        </div>
      </div>
      <div className={'infoModal__footer'}>
        <div className={'marginBottom'}>
          Betreiben Sie eine Tierarztpraxis und möchten den Notdienst-Finder auf
          ihrer Website einbinden?
        </div>
        <button
          onClick={() => {
            window.open(
              'http://www.pfotendoctor.de/haeufig-gestellte-fragen',
              '_blank',
            );
          }}
        >
          Kontakt aufnehmen
        </button>
      </div>
    </div>
  );
};
