import React, { useEffect, useRef, useState } from 'react';
import { Marker } from './Marker';
import GoogleMapReact from 'google-map-react';
import '../App.css';
import axios from 'axios';
import { Item } from './Item';
import ClinicDetails from './ClinicDetails';
import ClincDetailsEmergency from './ClincDetailsEmergency';
import { InfoModal } from './InfoModal';
import CurrentPositionMarker from './CurrentPositionMarker';
import Search from './Search';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  lat: number;
  lng: number;
  clinic: string;
  method: Method;
}

export enum ClinicType {
  clinic = 'clinic',
  emergencyRing = 'emergencyRing',
  vetExtendedOpeningHours = 'vetExtendedOpeningHours',
  custom = 'custom',
}

export enum Method {
  internal = 'internal',
  external = 'external',
}

interface ClinicService {
  coordinatesLat: number;
  coordinatesLong: number;
  id: number;
  name: string;
  showInMobileApp: boolean;
  type: ClinicType;
}

interface GeoLocation {
  lat: number;
  long: number;
}

export default function ClinicFinder(props: Props) {
  const [clinicServices, setClinicServices] = useState<ClinicService[]>(null);
  const [activeInfoCardId, setActiveInfoCardId] = useState<number>(null);
  const [hoveredMarker, setHoveredMarker] = useState<number>(null);
  const [clinicServiceDetails, setClinicServiceDetails] = useState(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPin, setShowPin] = useState<boolean>(false);
  const [showItemList, setShowItemList] = useState<boolean>(false);
  const [userGeoLocation, setUserGeoLocation] = useState<GeoLocation>(null);
  const [positioning, setPositioning] = useState<boolean>(false);
  const [customPosition, setCustomPosition] = useState<GeoLocation>(null);
  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.lng,
    },
    zoom: 10,
  };

  // Get clinic services
  const FetchClinicServices = () => {
    try {
      axios
        .get('http://127.0.0.1:3001/vet-practices')

        .then(response => {
          setClinicServices(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    FetchClinicServices();
    if (window) {
      setShowItemList(window.innerWidth >= 668);
    }
    if (navigator.geolocation) {
      getGeoLoacation();
    }
  }, []);

  // Geo location
  const getGeoLoacation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = pos => {
      const crd = pos.coords;
      setUserGeoLocation({ lat: crd.latitude, long: crd.longitude });
    };
    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  // Get nearest Clinics
  const distanceBetweenCoordinates = (
    [lat1, lon1]: number[],
    [lat2, lon2]: number[],
    isMiles = false,
  ) => {
    const toRadian = (angle: number) => (Math.PI / 180) * angle;
    const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);

    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

    if (isMiles) {
      finalDistance /= 1.60934;
    }
    return finalDistance;
  };

  const sortClinicsByDistance = (lat: number, long: number) => {
    return clinicServices
      .map((clinic, i) => {
        return {
          ...clinic,
          mapsIdentifier: i.toString(),
          distance: distanceBetweenCoordinates(
            [lat, long],
            [clinic.coordinatesLat, clinic.coordinatesLong],
          ),
        };
      })
      .sort((a, b) => {
        return a.distance - b.distance;
      })
      .slice(0, 10);
  };

  const toggleInfoCard = async (id: number) => {
    try {
      await axios
        .get(`http://127.0.0.1:3001/vet-practices/${id}`)
        .then(response => {
          setActiveInfoCardId(id);
          setClinicServiceDetails(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const resetClinicService = () => {
    setActiveInfoCardId(null);
  };

  const renderDetails = clinic => {
    if (clinicServiceDetails.type === ClinicType.emergencyRing) {
      return (
        <ClincDetailsEmergency
          clinicServiceDetails={clinicServiceDetails}
          backToList={() => {
            resetClinicService();
          }}
        />
      );
    } else {
      return (
        <ClinicDetails
          clinicServiceDetails={clinicServiceDetails}
          backToList={() => {
            resetClinicService();
          }}
        />
      );
    }
  };

  // Map actions
  const backToMap = () => {
    resetClinicService();
    setShowItemList(false);
  };

  const clearPosition = () => {
    setPositioning(false);
    setUserGeoLocation(null);
    setCustomPosition(null);
  };

  const moveToPosition = async () => {
    await clearPosition();
    await getGeoLoacation();
    if (userGeoLocation) {
      setCustomPosition({
        lat: userGeoLocation.lat,
        long: userGeoLocation.long,
      });
      setShowPin(false);
      setPositioning(true);
    }
  };

  const moveToSearchLocation = (placeId: string) => {
    setIsLoading(true);
    axios
      .get(
        `http://127.0.0.1:3001/mobile-app-frontend/vet-finder/location-search/geo-location?place-id=${placeId}`,
      )
      .then(response => {
        setPositioning(true);
        setCustomPosition({ lat: response.data.lat, long: response.data.long });
        setIsLoading(false);
        setShowPin(true);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
      });
  };

  return (
    <div className={'container'}>
      <div className={'container__header'}>
        <div className={'container__headerLeft'}>
          <span className={'emergencyText'}>
            Notfälle sind lebensbedrohliche Situationen.&nbsp;
          </span>
          <span>
            Sollte Ihr Haustier verunglückt sein, stark bluten oder sich
            anderweitig besorgniserregend verhalten, kontaktieren Sie außerhalb
            der Praxis-Öffnungszeiten bitte umgehend einen der untenstehenden
            Notdienste.
          </span>
        </div>
        <div className={'container__headerRight'}>
          <img src={'red_cross.png'} alt={'emergency cross'} />
        </div>
      </div>
      <div className={'container__body'}>
        <GoogleMapReact
          disableFullScreenControl={true}
          bootstrapURLKeys={{ key: 'AIzaSyCy22mfVK_HzEe6aYr-aV0YE-10qAcWSXQ' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={
            positioning && customPosition
              ? { lat: customPosition.lat, lng: customPosition.long }
              : null
          }
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => console.log(map)}
        >
          <Marker
            key={0}
            id={0}
            type={ClinicType.clinic}
            lat={props.lat}
            lng={props.lng}
            toggleInfoCard={() => {}}
            activeInfoCardId={activeInfoCardId}
            hoveredMarker={hoveredMarker}
            clinic={props.clinic}
          />
          {!showPin
            ? null
            : positioning &&
              customPosition && (
                <Marker
                  key={10000}
                  id={1}
                  type={ClinicType.custom}
                  lat={customPosition.lat}
                  lng={customPosition.long}
                  toggleInfoCard={() => {}}
                  activeInfoCardId={null}
                  hoveredMarker={null}
                />
              )}
          {userGeoLocation && (
            <CurrentPositionMarker
              lat={userGeoLocation.lat}
              lng={userGeoLocation.long}
            />
          )}
          {clinicServices &&
            clinicServices.map(clinicService => {
              return (
                <Marker
                  key={clinicService.id}
                  id={clinicService.id}
                  activeInfoCardId={activeInfoCardId}
                  toggleInfoCard={id => {
                    toggleInfoCard(id).then(r => setShowItemList(true));
                  }}
                  lat={clinicService.coordinatesLat}
                  lng={clinicService.coordinatesLong}
                  type={clinicService.type}
                  hoveredMarker={hoveredMarker}
                />
              );
            })}
        </GoogleMapReact>
        <div
          className={
            showItemList
              ? 'container__bodyRight'
              : 'container__bodyRightInactive'
          }
        >
          {!activeInfoCardId && (
            <div
              onClick={() => {
                backToMap();
              }}
              className={'clinicDetails__redRowContainer backToMap'}
            >
              <img src={'arrow_left.svg'} alt={'arrow left'} />
              <div>Karte</div>
            </div>
          )}
          {clinicServices &&
            !activeInfoCardId &&
            sortClinicsByDistance(props.lat, props.lng).map(clinicService => {
              return (
                <div key={clinicService.id}>
                  <Item
                    id={clinicService.id}
                    activeInfoCardId={activeInfoCardId}
                    toggleInfoCard={id => {
                      setActiveInfoCardId(id);
                    }}
                    toggleHoveredMarker={id => {
                      setHoveredMarker(id);
                    }}
                    setClinicServiceDetails={clinic => {
                      setClinicServiceDetails(clinic);
                    }}
                  />
                </div>
              );
            })}
          {activeInfoCardId &&
            activeInfoCardId === clinicServiceDetails?.id &&
            renderDetails(clinicServiceDetails)}
        </div>
        {props.method === Method.external && (
          <div className={'container__bodyLeft'}>
            <div className={'container__bodyLeftText'}>
              Notdienste in unserer Nähe
            </div>
          </div>
        )}
        {props.method === Method.internal && (
          <div>
            <div className={'container__bodyLeft'}>
              <Search
                removePin={() => {
                  setShowPin(false);
                }}
                moveToSearchLocation={placeId => {
                  moveToSearchLocation(placeId);
                }}
              />
            </div>
          </div>
        )}
        <div className={'container__bodyItems'}>
          <div
            className={'container__bodyControlsIcon'}
            onClick={userGeoLocation ? moveToPosition : null}
          >
            {userGeoLocation && (
              <img src={'controls.svg'} alt={'controls icon'} />
            )}
            {!userGeoLocation && (
              <div className={'container__bodyControlsLoading'}>
                <div className={'container__bodyControlsLoadingBox'}>
                  <LoadingSpinner />
                </div>
              </div>
            )}
          </div>
          <div
            className={'container__bodyItemsIcon'}
            onClick={() => {
              setShowItemList(true);
            }}
          >
            <img src={'items_icon.svg'} alt={'items icon'} />
          </div>
        </div>
      </div>
      <div
        className={
          props.method === Method.internal
            ? 'container__footerInternal'
            : 'container__footer'
        }
      >
        <div className={'clinicDetails__emergencyInfo--title'}>
          Nicht sicher, ob es sich um einen Notfall handelt?
        </div>
        {props.method === Method.external && (
          <>
            <div>
              Die erfahrenen Tierärzte von Pfotendoctor können Ihnen innerhalb
              weniger Minuten eine erste Einschätzung bieten und Sie zu den
              nächsten Schritten beraten.
            </div>
            <button
              className={'container__footer--button'}
              onClick={() => window.open('https://pfotendoctor.de', '_blank')}
            >
              <img src={'video_icon.svg'} alt={'video call icon'} />
              <div>Jetzt Videosprechstunde buchen</div>
            </button>
          </>
        )}
        {props.method === Method.internal && (
          <>
            <div>
              Unsere erfahrenen Tierärzte können dir per Videosprechstunde
              innerhalb weniger Minuten eine erste Einschätzung bieten und dich
              zu den nächsten Schritten beraten.
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
      {props.method === Method.external && (
        <>
          <div
            className={'container__footer--infoContainer'}
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <div className={'container__footer--infoBox'}>
              <img src={'pd-logo.svg'} alt={'info icon'} />
              <div className={'container__footer--infoText'}>Informationen</div>
            </div>
          </div>
          {showModal && (
            <div
              className={'infoModalContainer'}
              onClick={() => {
                setShowModal(false);
              }}
            >
              <div onClick={e => e.stopPropagation()}>
                <InfoModal
                  closeModal={() => {
                    setShowModal(false);
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
