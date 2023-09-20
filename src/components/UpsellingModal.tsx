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
      Ein Besuch außerhalb regulärer Öffnungszeiten ist mit erhöhten Kosten und möglicherweise längeren Wartezeiten verbunden.
      </div>
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
