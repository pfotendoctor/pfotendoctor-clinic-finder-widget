import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';
import _ from 'lodash';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import searchIcon from '../images/searchIcon.svg';
import closeIcon from '../images/closeIcon.svg';
import arrowRight from '../images/arrowRight.svg';

export type ResulListElement = {
  searchTermResult: string;
  placeId: string;
};

export type ResultListType = ResulListElement[];

interface Props {
  removePin: () => void;
  moveToSearchLocation: (placeId: string) => void;
}

const Search = (props: Props) => {
  const [resultList, setResultList] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [resultListLoading, setResultListLoading] = useState<boolean>(null);
  const [active, setActive] = useState<boolean>(false);
  const autoCompleteSessionUUID: string = uuidv4();

  const onChangeSearchFieldText = (text: string) => {
    if (text.length >= 1) {
      setTextInput(text);
      debouncedSearch(text);
      setResultListLoading(true);
    } else {
      setResultList(null);
      setActive(false);
      setTextInput('');
      setResultListLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    _.debounce(async text => {
      FetchAutoCompleteResults(text, autoCompleteSessionUUID);
    }, 300),
    [autoCompleteSessionUUID],
  );

  const FetchAutoCompleteResults = (text: string, session: string) => {
    setResultListLoading(true);
    if (!text) {
      return;
    }
    axios
      .get(
        `http://127.0.0.1:3001/mobile-app-frontend/vet-finder/location-search/autocomplete-predictions?search-term=${text}&session=${session}`,
      )
      .then(r => {
        const resultList: ResultListType = r.data.map(result => {
          return {
            searchTermResult: result.prediction,
            placeId: result.locationId,
          };
        });
        setResultList(resultList);
        setResultListLoading(false);
      })
      .catch(error => {
        console.log('error: ', error.response);
        setResultListLoading(false);
      });
  };

  const removeSearch = () => {
    setActive(false);
    setResultList(null);
    setTextInput('');
    props.removePin();
  };

  const handleSearchClick = item => {
    console.log(item);
    props.moveToSearchLocation(item.placeId);
    setTextInput(item.searchTermResult);
    setActive(false);
    setResultList(null);
  };

  useEffect(() => {
    if (resultList) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [resultList]);

  return (
    <div
      className={
        !!active
          ? 'container__bodyLeftContainerActive'
          : 'container__bodyLeftContainer'
      }
    >
      <div className={'container__bodyLeftSearch'}>
        {resultListLoading && <LoadingSpinner />}
        {!resultListLoading && (
          <img
            className={'container__bodyLeftSearchIcon'}
            src={searchIcon}
            alt={'search'}
          />
        )}
        <input
          value={textInput}
          onChange={e => {
            onChangeSearchFieldText(e.target.value);
          }}
          placeholder={'Adresse, Ort, etc.'}
        />
        {!!textInput && (
          <img
            className={'container__bodyLeftCloseIcon'}
            onClick={() => {
              removeSearch();
            }}
            src={closeIcon}
            alt={'close'}
          />
        )}
      </div>
      {resultList && (
        <div>
          {resultList.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  handleSearchClick(item);
                }}
                className={'container__bodyLeftItem'}
              >
                <div className={'container__bodyLeftItemResult'}>
                  {item.searchTermResult}
                </div>
                <img
                  className={'container__bodyLeftItemIcon'}
                  src={arrowRight}
                  alt={'arrow right'}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;