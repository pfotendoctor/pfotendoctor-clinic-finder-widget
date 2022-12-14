import React from 'react';

const UpsellingBox = () => {
  return (
    <div className={'clinicDetails__detailContainerBox'}>
      <div className={'clinicDetails__redRowContainer'}></div>
      <div className={'clinicDetails__detailContainer--titleSmall'}>
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
      <div className={'clinicDetails__buttonContainer'}>
        <button
          onClick={() => {
            window.open('https://pfotendoctor.de/terminbuchung?chat&utm_source=website&utm_medium=website&utm_campaign=klinikfinder&utm_content=klinikfinder', '_blank');
          }}
        >
          Jetzt tierärztlichen Rat erhalten
        </button>
      </div>
    </div>
  );
};

export default UpsellingBox;
