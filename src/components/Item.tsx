import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css';
import { ErrorState } from './ClinicFinder';

type Item = {
  id: number;
  activeInfoCardId: number;
  toggleInfoCard: (id: number) => void;
  toggleHoveredMarker: (id: number) => void;
  setClinicServiceDetails: (clinic) => void;
};

export const Item = (props: Item) => {
  const [clinicService, setClinicService] = useState(null);
  const [error, setError] = useState<ErrorState>(null);
  const FetchClinicService = (id: number) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/vet-practices/${id}`)
      .then(response => {
        setClinicService(response.data);
      })
      .catch(e => {
        setError({
          code: e.code,
          message: e.message,
        });
      });
  };

  useEffect(() => {
    FetchClinicService(props.id);
  }, [props.id]);

  const handleClinicServiceDetails = id => {
    props.toggleInfoCard(id);
    props.setClinicServiceDetails(clinicService);
  };

  return (
    <div>
      {error && (
        <div>
          <div className={'container__bodyRight--itemTitle'}>
            <b>Es gab einen Fehler</b>
          </div>
        </div>
      )}
      {clinicService && !error && (
        <div
          onClick={() => {
            handleClinicServiceDetails(props.id);
          }}
          onMouseEnter={() => {props.toggleHoveredMarker(props.id);}}
          onMouseLeave={() => props.toggleHoveredMarker(null)}
          className={'container__bodyRight--item'}
        >
          <div className={'container__bodyRight--itemTitle'}>
            {clinicService.name}
          </div>
          <div className={'container__bodyRight--itemActiveStreet'}>
            {clinicService.street} {clinicService.houseNumber}
          </div>
          <div>{clinicService.city}</div>
        </div>
      )}
    </div>
  );
};
