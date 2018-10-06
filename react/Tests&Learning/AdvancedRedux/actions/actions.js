import axios from 'axios';
import debounce from 'lodash.debounce';

import { ActionTypes as types } from '../constants';


export function changeSearchPlace(searchPlace) { return { type:types.CHANGE_SEARCH_PLACE, data:{searchPlace: searchPlace} } }
export function changeResultsNumber(resultsNumber) { return { type:types.CHANGE_RESULTS_NUMBER, data:{resultsNumber: resultsNumber} } }
export function changeCategory(searchCategory) { return { type:types.CHANGE_CATEGORY, data:{searchCategory: searchCategory} } }
export function updateResultsTableWithResults(searchCategory) { return { type:types.CHANGE_CATEGORY, data:{searchCategory: searchCategory} } }

export function ajaxCallThunk(param){
    return dispatch => {
        setTimeout(() => {
            dispatch(changeSearchPlace("tanta"+param));
        }, 3000);
    };
}


let makePostalOfficesAjaxCall = debounce(_makePostalOfficesAjaxCall, 3000);
export function updateResultsTable(searchPlace){
    return dispatch => { makePostalOfficesAjaxCall(searchPlace, dispatch) };    
}

function _makePostalOfficesAjaxCall(searchPlace,dispatch){
    //TODO: ajax call is failing because server doesn't support cross-origin calls. please fix that
    dispatch({type:"Sending Axios Request"});
    axios.post("http://ahmed-badawy.com/site/projects/postaloffices/query-info",{q:searchPlace}).then(results=>{
        console.log(results.data);
        // dispatch(updateResultsTableWithResults(result.data))
    })
}

