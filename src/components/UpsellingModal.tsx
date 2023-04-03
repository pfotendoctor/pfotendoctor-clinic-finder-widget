import React from 'react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface UpsellingModal {
  onClick: () => void;
}

const UpsellingModal = (props: UpsellingModal) => {
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const isDay = () => {
    const hours = dayjs().hour();
    return hours >= 7 && hours < 22;
  };

  return (
    <div className={'upsellingModal'}>
      <div className={'upsellingModal__header'}>
        <img
          src={`${process.env.REACT_APP_CDN_URL}/stats.svg`}
          alt={'statistic icon'}
          className={'upsellingModal--icon'}
        />
        <div className={'upsellingModal__header--text'}>
          Tierärztliche Statistiken zeigen
        </div>
      </div>
      <div className={'upsellingModal--title'}>
        Nur eine von fünf Situationen, die ein Tierbesitzer als Notfall
        einstuft, ist ein tatsächlicher Notfall und akut behandlungsbedürftig
      </div>
      {windowSize.innerWidth > 547 && (
        <div className={'upsellingModal__title--description'}>
          Falsch eingeschätzte Situationen können für Tierbesitzer zu erhöhten
          Wartezeiten im Notdienst führen und unnötige Kosten verursachen.
        </div>
      )}
      <div className={'upsellingModal__subTitle'}>
        Nicht sicher, ob es sich bei dir um einen Notfall handelt?
      </div>
      <div className={'upsellingModal__subTitle--description'}>
        Ein Notfallgespräch mit einem unserer erfahrenen Tierärzte per Telefon
        oder Video schafft in wenigen Minuten Klarheit.
      </div>
      {!isDay() && (
        <div className={'upsellingModal__pledgeText'}>
          <span>Unsere Garantie:</span> Falls du im Anschluss einen lokalen
          Notdienst aufsuchen musst, erstatten wir die Kosten des Gesprächs.
        </div>
      )}
      <button
        className={'upsellingModal__buttonPrimary'}
        onClick={() => window.open('tel:+498007777444', '_blank')}
      >
        {windowSize.innerWidth >= 547 && (
          <img
            src={`${process.env.REACT_APP_CDN_URL}/phone_icon_filled.svg`}
            alt={'video call icon'}
            className={'upsellingModal--icon'}
          />
        )}
        <div>Tierarzt per Telefon sprechen</div>
      </button>
      <button
        className={'upsellingModal__buttonSecondary'}
        onClick={props.onClick}
      >
        <>
          {windowSize.innerWidth > 547 && (
            <img
              src={`${process.env.REACT_APP_CDN_URL}/map_icon.svg`}
              alt={'video call icon'}
              className={'upsellingModal--icon'}
            />
          )}
          {windowSize.innerWidth <= 547 ? (
            <div>Weiter zu den lokalen Notdiensten</div>
          ) : (
            <div>
              Nein danke,{' '}
              <span className="regularText">
                weiter zu den lokalen Notdiensten
              </span>
            </div>
          )}
        </>
      </button>
    </div>
  );
};

export default UpsellingModal;
