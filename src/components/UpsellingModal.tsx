import React from 'react';
import dayjs from "dayjs";


const UpsellingModal = () => {
    const isDay = () => {
        const hours = dayjs().hour()
        return (hours >= 7 && hours < 22)
    }

    return (
        <div className={'upsellingModal'}>

            {/*<img*/}
            {/*    src={`${process.env.REACT_APP_CDN_URL}/camera_white.svg`}*/}
            {/*    alt={'controls icon'}*/}
            {/*/>*/}
            {/*<img*/}
            {/*    src={`${process.env.REACT_APP_CDN_URL}/map.svg`}*/}
            {/*    alt={'controls icon'}*/}
            {/*/>*/}
            <div className={'upsellingModal__header'}>
                <img
                    src={`${process.env.REACT_APP_CDN_URL}/stats.svg`}
                    alt={'statistic icon'}
                />
                <div className={'upsellingModal__header--text'}>Tierärztliche Statistiken zeigen</div>
            </div>
            <div className={'upsellingModal--title'}>Nur eine von fünf Situationen, die ein Tierbesitzer als Notfall einstuft, ist ein tatsächlicher Notfall und akut behandlungsbedürftig</div>
            <div className={'upsellingModal__title--description'}>Falsch eingeschätzte Situationen können für Tierbesitzer zu erhöhten Wartezeiten im Notdienst führen und unnötige Kosten verursachen.</div>
            <div className={'upsellingModal__subTitle'}>Nicht sicher, ob es sich bei dir um einen Notfall handelt?</div>
            <div className={'upsellingModal__subTitle--description'}>Ein Notfallgespräch mit einem unserer erfahrenen Tierärzte per Telefon oder Video schafft in wenigen Minuten Klarheit.</div>
            {!isDay() &&
                <div className={'upsellingModal__pledgeText'}><span>Unsere Garantie:</span> Falls du im Anschluss einen lokalen Notdienst aufsuchen musst, erstatten wir die Kosten des Gesprächs.</div>
            }
            <button
                className={'upsellingModal__buttonPrimary'}
                onClick={() => window.open('https://pfotendoctor.de/termin-buchen-3', '_blank')}
            >
                <img
                    className={'upsellingModal__buttonPrimary'}
                    src={`${process.env.REACT_APP_CDN_URL}/video_icon_white.svg`}
                    alt={'video call icon'}
                />
                <div>Videosprechstunde buchen</div>
            </button>
            <button
                className={'upsellingModal__buttonSecondary'}
                onClick={() => window.open('https://pfotendoctor.de/termin-buchen-3', '_blank')}
            >
                <img
                    src={`${process.env.REACT_APP_CDN_URL}/map.svg`}
                    alt={'video call icon'}
                />
                <div><span>Nein danke</span><span>, weiter zu den lokalen Notdiensten</span></div>
            </button>
        </div>
    );
};

export default UpsellingModal;