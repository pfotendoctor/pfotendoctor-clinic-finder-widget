import React from 'react';

const UpsellingBoxEmergency = () => {
  return (
    <div className={'clinicDetails__detailContainerBox--emergency'}>
      <div className={'clinicDetails__redRowContainer'}></div>
      <div className={'clinicDetails__detailContainer--title'}>
        <span className={'clinicDetails__redText'}>Hinweis: </span>
        <span>
          Nur 2 von 10 Fällen sind wirkliche Notfälle die akut behandelt werden
          müssen
        </span>
      </div>
      <div className={'clinicDetails__detailContainer--subTitle'}>
        Sprich in wenigen Minuten mit einem erfahrenen Pfotendoctor-Tierarzt,
        falls du dir nicht sicher bist ob ein Notfall vorliegt.
      </div>
      <div className={'clinicDetails__buttonContainer--emergency'}>
        <button
          onClick={() => {
            window.open('https://pfotendoctor.de/termin-buchen-3', '_blank');
          }}
        >
          Jetzt tierärztlichen Rat erhalten
        </button>
      </div>
    </div>
  );
};

export default UpsellingBoxEmergency;
