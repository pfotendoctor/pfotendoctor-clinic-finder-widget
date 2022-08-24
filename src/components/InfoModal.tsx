import React from 'react';
import '../App.css';

const InfoModal = () => {
    return (
        <div className={"infoModal"}>
            <div className={"infoModal__header"}>
                <div className={"clinicDetails__detailContainer--title"}>Informationen</div>
                <img src={"close_icon.svg"}/>
            </div>
            <div className={"infoModal__body"}>
                <div>Dieses Notdienst-Widget wird entwickelt und kostenfrei bereitgestellt von</div>
            </div>
            <div className={"infoModal__footer"}>FOOTER</div>
        </div>
    );
};

export default InfoModal;
