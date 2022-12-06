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
import UpsellingModal from './UpsellingModal';

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
  showForCustomer: boolean;
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
const ClinicFinder = (props: ClinicFinder) => {
  const [clinics, setClinics] = useState<ClinicService[]>(null);
  const [activeClinicSiteId, setActiveClinicSiteId] = useState<number>(null);
  const [hoveredMarker, setHoveredMarker] = useState<number>(null);
  const [clinicDetails, setClinicDetails] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSearchMarker, setShowSearchMarker] = useState<boolean>(false);
  const [showItemList, setShowItemList] = useState<boolean>(false);
  const [userGeoLocation, setUserGeoLocation] = useState<GeoLocation>(null);
  const [geoPermissions, setGeoPermissions] = useState<boolean>(false);
  const [loadingGeoLocation, setLoadingGeolocation] = useState<boolean>(false);
  const [showCurrentPosition, setShowCurrentPosition] =
    useState<boolean>(false);
  const [customPosition, setCustomPosition] = useState<GeoLocation>({
    lat: props.lat,
    lng: props.lng,
  });
  const [error, setError] = useState<ErrorState>(null);
  const [numberOfMarkerClicks, setNumberOfMarkerClicks] = useState<number>(0);
  const [showUpsellingModal, setShowUpsellingModal] = useState<boolean>(false);
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
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/mobile-app-frontend/vet-finder/vet-practices`,
      )

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
  }, []);

  // Geo location

  const getUserGeoLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos: any) => {
      const crd = pos.coords;
      setUserGeoLocation({ lat: crd.latitude, lng: crd.longitude });
    };
    const error = (err: any) => {
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

  useEffect(() => {
    if (numberOfMarkerClicks === 1) {
      setShowUpsellingModal(true);
    } else {
      setShowUpsellingModal(false);
    }
  }, [numberOfMarkerClicks]);

  const toggleInfoCard = async (id: number) => {
    setNumberOfMarkerClicks(numberOfMarkerClicks + 1);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/mobile-app-frontend/vet-finder/vet-practices/${id}`,
        )
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

  const renderDetails = (clinic: ClinicFinder) => {
    if (numberOfMarkerClicks > 1) {
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
    setLoadingGeolocation(true);
    setLoadingGeolocation(true);
    await clearPosition();
    if (navigator.geolocation) {
      await getUserGeoLocation();
    }
    if (userGeoLocation) {
      setCustomPosition({
        lat: userGeoLocation.lat,
        lng: userGeoLocation.lng,
      });
      setShowSearchMarker(false);
      setShowCurrentPosition(true);
    }
  };

  useEffect(() => {
    if (userGeoLocation) {
      setLoadingGeolocation(false);
    }
  }, [userGeoLocation]);

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
    <div
      className={
        props.providedAt === ProvidedAt.pfotendoctor
          ? 'containerInternal'
          : 'container'
      }
    >

      {isLoading && (
        <div className={'container__bodyFixed'}>
          <LoadingSpinner />
        </div>
      )}

      {props.providedAt === ProvidedAt.external && (
        <div className={'container__bodyLeft'}>
          <div className={'container__bodyLeftText'}>
            <h2>Notdienste in unserer Nähe</h2>
          </div>
        </div>
      )}
      {showUpsellingModal && (
        <div className={'upsellingModalContainer'}>
          <UpsellingModal
            onClick={() => setNumberOfMarkerClicks(numberOfMarkerClicks + 1)}
          />
        </div>
      )}
      {props.providedAt === ProvidedAt.pfotendoctor &&
        numberOfMarkerClicks !== 1 && (
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
        )}

      <div className={'container__bodyItems'}>
        <div className={'container__bodyControlsIcon'}>
          {!loadingGeoLocation && (
            <img
              src={`${process.env.REACT_APP_CDN_URL}/controlsBlank.svg`}
              alt={'controls icon'}
              onClick={moveToPosition}
            />
          )}
          {loadingGeoLocation && (
            <div className={'container__bodyControlsLoading'}>
              <div className={'container__bodyControlsLoadingBox'}>
                <LoadingSpinner />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={'container__bodyItems'}
        onClick={() => {
          setShowItemList(true);
        }}
      >
        <div className={'container__bodyItemsIcon'}>
          <img
            src={`${process.env.REACT_APP_CDN_URL}/items_icon.svg`}
            alt={'items icon'}
          />
        </div>
      </div>
      {clinics && !isLoading && (
        <div className={'container__body'}>
          <Map
            defaultProps={defaultProps}
            showCurrentPosition={showCurrentPosition}
            customPosition={customPosition}
            lat={props.lat}
            lng={props.lng}
            providedAt={props.providedAt}
            activeClinicSiteId={activeClinicSiteId}
            hoveredMarker={hoveredMarker}
            clinic={props.clinic}
            showItemList={showItemList}
            showSearchMarker={showSearchMarker}
            userGeoLocation={userGeoLocation}
            clinicServices={clinics}
            toggleInfoCard={id => {
              toggleInfoCard(id).then(r => setShowItemList(true));
            }}
            numberOfMarkerClicks={numberOfMarkerClicks}
            onHover={id => {
              setHoveredMarker(id);
            }}
          />
          <div
            className={
              showItemList && numberOfMarkerClicks > 1
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
            {clinics && !activeClinicSiteId && (
              <div className={'container__bodyRight--itemBox'}>
                {sortClinicsByDistance(
                  customPosition.lat,
                  customPosition.lng,
                ).map(clinicService => {
                  return (
                    <Item
                      hoveredMarker={hoveredMarker}
                      key={clinicService.id}
                      id={clinicService.id}
                      activeInfoCardId={activeClinicSiteId}
                      toggleInfoCard={id => {
                        setActiveClinicSiteId(id);
                        setNumberOfMarkerClicks(numberOfMarkerClicks + 1);
                      }}
                      toggleHoveredMarker={id => {
                        setHoveredMarker(id);
                      }}
                      setClinicServiceDetails={clinic => {
                        setClinicDetails(clinic);
                      }}
                    />
                  );
                })}
              </div>
            )}
            {activeClinicSiteId &&
              activeClinicSiteId === clinicDetails?.id &&
              renderDetails(clinicDetails)}
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
};

export default ClinicFinder;
