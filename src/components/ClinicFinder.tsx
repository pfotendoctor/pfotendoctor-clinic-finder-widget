import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Item } from './Item';
import ClinicRegularDetails from './ClinicRegularDetails';
import ClincDetailsEmergencyRings from './ClincDetailsEmergencyRings';
import Search from './Search';
import LoadingSpinner from './LoadingSpinner';
import Footer from './Footer';
import Map from './Map';

interface ClinicFinder {
  lat: number;
  lng: number;
  clinic: string;
  providedAt: ProvidedAt;
}

export enum ClinicType {
  clinic = 'clinic',
  emergencyRing = 'emergencyRing',
  vetExtendedOpeningHours = 'vetExtendedOpeningHours',
  custom = 'custom',
}

export enum ProvidedAt {
  pfotendoctor = 'pfotendoctor',
  external = 'external',
}

export interface ClinicService {
  coordinatesLat: number;
  coordinatesLong: number;
  id: number;
  name: string;
  showInMobileApp: boolean;
  type: ClinicType;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface ErrorState {
  code: number | string;
  message: string;
}

export default function ClinicFinder(props: ClinicFinder) {
  const [clinics, setClinics] = useState<ClinicService[]>(null);
  const [activeClinicSiteId, setActiveClinicSiteId] = useState<number>(null);
  const [hoveredMarker, setHoveredMarker] = useState<number>(null);
  const [clinicDetails, setClinicDetails] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearchMarker, setShowSearchMarker] = useState<boolean>(false);
  const [showItemList, setShowItemList] = useState<boolean>(false);
  const [userGeoLocation, setUserGeoLocation] = useState<GeoLocation>(null);
  const [showCurrentPosition, setShowCurrentPosition] =
    useState<boolean>(false);
  const [customPosition, setCustomPosition] = useState<GeoLocation>(null);
  const [error, setError] = useState<ErrorState>(null);
  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.lng,
    },
    zoom: 10,
  };

  // Get clinicName services
  const FetchClinics = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/vet-practices`)

      .then(response => {
        setClinics(response.data);
      })
      .catch(e => {
        console.log('ERROR', e);
        setError({ code: e.message, message: e.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    FetchClinics();
    if (window) {
      setShowItemList(window.innerWidth >= 668);
    }
    console.log('geolocation: ', navigator.geolocation);
    if (navigator.geolocation) {
      getUserGeoLocation();
    }
  }, []);

  // Geo location
  const getUserGeoLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = pos => {
      const crd = pos.coords;
      setUserGeoLocation({ lat: crd.latitude, lng: crd.longitude });
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

    return finalDistance;
  };

  const sortClinicsByDistance = (lat: number, long: number) => {
    return clinics
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
        .get(`${process.env.REACT_APP_BACKEND_URL}/vet-practices/${id}`)
        .then(response => {
          setActiveClinicSiteId(id);
          setClinicDetails(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const resetClinicService = () => {
    setActiveClinicSiteId(null);
  };

  const renderDetails = clinic => {
    if (clinicDetails.type === ClinicType.emergencyRing) {
      return (
        <ClincDetailsEmergencyRings
          clinicServiceDetails={clinicDetails}
          backToList={() => {
            resetClinicService();
          }}
        />
      );
    } else {
      return (
        <ClinicRegularDetails
          clinicServiceDetails={clinicDetails}
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
    setShowCurrentPosition(false);
    setUserGeoLocation(null);
    setCustomPosition(null);
  };

  const moveToPosition = async () => {
    await clearPosition();
    await getUserGeoLocation();
    if (userGeoLocation) {
      setCustomPosition({
        lat: userGeoLocation.lat,
        lng: userGeoLocation.lng,
      });
      setShowSearchMarker(false);
      setShowCurrentPosition(true);
    }
  };

  const moveToSearchLocation = (placeId: string) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/mobile-app-frontend/vet-finder/location-search/geo-location?place-id=${placeId}`,
      )
      .then(response => {
        setShowCurrentPosition(true);
        setCustomPosition({ lat: response.data.lat, lng: response.data.long });
        setShowSearchMarker(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className={'container'}>
      <div className={'container__header'}>
        <div className={'container__headerLeft'}>
          {clinics && (
            <div>
              <span className={'emergencyText'}>
                Notfälle sind lebensbedrohliche Situationen.&nbsp;
              </span>
              <span>
                Sollte Ihr Haustier verunglückt sein, stark bluten oder sich
                anderweitig besorgniserregend verhalten, kontaktieren Sie
                außerhalb der Praxis-Öffnungszeiten bitte umgehend einen der
                untenstehenden Notdienste.
              </span>
            </div>
          )}
          {error && (
            <div className={'marginBottom'}>
              <span className={'emergencyText'}>
                Die Notdienstkarte ist zur Zeit nicht verfügbar.&nbsp;
              </span>
              <span>
                Wir arbeiten an einer Lösung und entschuldigen uns für den
                Ausfall.
              </span>
            </div>
          )}
        </div>
        <div className={'container__headerRight'}>
          <img
            src={`${process.env.REACT_APP_CDN_URL}/red_cross.png`}
            alt={'emergency cross'}
          />
        </div>
      </div>
      {isLoading && (
        <div className={'container__body'}>
          <LoadingSpinner />
        </div>
      )}
      {clinics && !isLoading && (
        <div className={'container__body'}>
          <Map
            defaultProps={defaultProps}
            showCurrentPosition={showCurrentPosition}
            customPosition={customPosition}
            lat={props.lat}
            lng={props.lng}
            activeClinicSiteId={activeClinicSiteId}
            hoveredMarker={hoveredMarker}
            clinic={props.clinic}
            showSearchMarker={showSearchMarker}
            userGeoLocation={userGeoLocation}
            clinicServices={clinics}
            toggleInfoCard={id => {
              toggleInfoCard(id).then(r => setShowItemList(true));
            }}
          />
          <div
            className={
              showItemList
                ? 'container__bodyRight'
                : 'container__bodyRightInactive'
            }
          >
            {!activeClinicSiteId && (
              <div
                onClick={() => {
                  backToMap();
                }}
                className={'clinicDetails__redRowContainer backToMap'}
              >
                <img
                  src={`${process.env.REACT_APP_CDN_URL}/arrow_left.svg`}
                  alt={'arrow left'}
                />
                <div>Karte</div>
              </div>
            )}
            {clinics &&
              !activeClinicSiteId &&
              sortClinicsByDistance(props.lat, props.lng).map(clinicService => {
                return (
                  <div key={clinicService.id}>
                    <Item
                      id={clinicService.id}
                      activeInfoCardId={activeClinicSiteId}
                      toggleInfoCard={id => {
                        setActiveClinicSiteId(id);
                      }}
                      toggleHoveredMarker={id => {
                        setHoveredMarker(id);
                      }}
                      setClinicServiceDetails={clinic => {
                        setClinicDetails(clinic);
                      }}
                    />
                  </div>
                );
              })}
            {activeClinicSiteId &&
              activeClinicSiteId === clinicDetails?.id &&
              renderDetails(clinicDetails)}
          </div>
          {props.providedAt === ProvidedAt.external && (
            <div className={'container__bodyLeft'}>
              <div className={'container__bodyLeftText'}>
                <h2>Notdienste in unserer Nähe</h2>
              </div>
            </div>
          )}
          {props.providedAt === ProvidedAt.pfotendoctor && (
            <div>
              <div className={'container__bodyLeft'}>
                <Search
                  removePin={() => {
                    setShowSearchMarker(false);
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
                <img
                  src={`${process.env.REACT_APP_CDN_URL}/controls.svg`}
                  alt={'controls icon'}
                />
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
              <img
                src={`${process.env.REACT_APP_CDN_URL}/items_icon.svg`}
                alt={'items icon'}
              />
            </div>
          </div>
        </div>
      )}
      <Footer
        error={error}
        providedAt={props.providedAt}
        toggleModal={value => setShowModal(value)}
        showModal={showModal}
      />
    </div>
  );
}
