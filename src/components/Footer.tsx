import React from 'react';
import {ProvidedAt} from "./ClinicFinder";
import {InfoModal} from "./InfoModal";

interface Footer {
    providedAt: ProvidedAt;
    toggleModal: (value:boolean) => void;
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
                    <h2>Nicht sicher, ob es sich um einen Notfall handelt?</h2>
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
                            <img src={`${process.env.REACT_APP_CDN_URL}/video_icon.svg`} alt={'video call icon'} />
                            <div>Jetzt Videosprechstunde buchen</div>
                        </button>
                    </>
                )}
                {props.providedAt === ProvidedAt.pfotendoctor && (
                    <>
                        <div>
                            <p>Unsere erfahrenen Tierärzte können dir per Videosprechstunde
                                innerhalb weniger Minuten eine erste Einschätzung bieten und dich
                                zu den nächsten Schritten beraten.
                            </p>
                        </div>
                        <button
                            className={'container__footer--buttonInternal'}
                            onClick={() =>
                                window.open('https://pfotendoctor.de/termin-buchen', '_blank')
                            }
                        >
                            <div>Videosprechstunde buchen</div>
                        </button>
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
                            <img src={`${process.env.REACT_APP_CDN_URL}/pd-logo.svg`} alt={'info icon'} />
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
