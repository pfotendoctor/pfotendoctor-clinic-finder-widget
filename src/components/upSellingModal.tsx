import React from 'react';
import dayjs from "dayjs";


const UpSellingModal = () => {
    const isDay = () => {
        const hours = dayjs().hour()
        return (hours >= 7 && hours < 22)
    }

    return (
        <div className={'upsellingModal'}>
            {isDay() ? "TAG" : "NACHT"}
        </div>
    );
};

export default UpSellingModal;