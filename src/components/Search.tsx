import React, {useCallback, useEffect, useState} from 'react';
import {v4, v4 as uuidv4} from 'uuid'
import '../App.css';
import _ from 'lodash'
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export type ResulListElement = {
    searchTermResult: string
    placeId: string
}

export type ResultListType = ResulListElement[]

interface Props {
    moveToSearchLoacation: (placeId: string) => void
}

const Search = (props: Props) => {
    const [clinic, setClinic] = useState(null)
    const [resultList, setResultList] = useState(null)
    const [textInput, setTextInput] = useState("")
    const [resultListLoading, setResultListLoading] = useState<boolean>(null)
    const [autoCompleteSessionUUID, setAutoCompleteSessionUUID] = useState<string>(uuidv4())
    const [active, setActive] = useState<boolean>(false)

    const onChangeSearchFieldText = (text: string) => {
        if(text.length >= 1) {
            setTextInput(text)
            debouncedSearch(text)
            setResultListLoading(true)
        } else {
            setResultList(null)
            setActive(false)
            setTextInput("")
            setResultListLoading(false)
        }
    }

    const debouncedSearch = useCallback(
        _.debounce(async text => {
            FetchAutoCompleteResults(text, autoCompleteSessionUUID)
        }, 300),
        [autoCompleteSessionUUID]
    )

    const FetchAutoCompleteResults = (text: string, session: string) => {
        setClinic(null)
        setResultListLoading(true)
        if (!text) {
            return
        }
        axios
            .get(
                `http://127.0.0.1:3001/mobile-app-frontend/vet-finder/location-search/autocomplete-predictions?search-term=${text}&session=${session}`
            )
            .then(r => {
                const resultList: ResultListType = r.data.map((result: any) => {
                    return {
                        searchTermResult: result.prediction,
                        placeId: result.locationId,
                    }
                })
                setResultList(resultList)
                setResultListLoading(false)
            })
            .catch(error => {
                console.log("error: ",error.response)
                setResultListLoading(false)
            })
    }

    const removeSearch = () => {
        setActive(false)
        setResultList(null)
        setTextInput("")
    }

    useEffect(() => {
        if(resultList) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [resultList])

    return (
        <div className={!!active ? "container__bodyLeftContainerActive" : "container__bodyLeftContainer"}>
            <div className={"container__bodyLeftSearch"}>
                {/*<LoadingSpinner/>*/}
                {resultListLoading && <LoadingSpinner/>}
                {!resultListLoading &&
                    <img
                        className={"container__bodyLeftSearchIcon"}
                        src={"searchIcon.svg"}
                        alt={"search"}/>}
                <input
                    value={textInput}
                    onChange={(e) => {onChangeSearchFieldText(e.target.value)}}
                    placeholder={"Adresse, Ort, etc."}/>
                <img
                    className={"container__bodyLeftCloseIcon"}
                    onClick={() => {removeSearch()}}
                    src={"closeIcon.svg"}
                    alt={"close"}/>
            </div>
            {resultList &&
            <div>
                {resultList.map((item, i) => {
                    return(
                        <div
                            key={i}
                            onClick={() => {props.moveToSearchLoacation(item.placeId)}}
                            className={"container__bodyLeftItem"}>
                            <div className={"container__bodyLeftItemResult"}>{
                                item.searchTermResult}
                            </div>
                            <img
                                className={"container__bodyLeftItemIcon"}
                                src={"arrowRight.svg"}
                                alt={"arrow right"}/>
                        </div>
                    )
                } )}
            </div>
            }
        </div>
    );
};

export default Search;
