import axios from 'axios';
import debounce from 'lodash.debounce';

import { ActionTypes as types } from '../constants';

// from the action you can either return an action like an object like that: {type, data}
// export function changeSearchPlace(searchPlace) {
//   return {
//     type: types.CHANGE_SEARCH_PLACE,
//     data: { searchPlace: searchPlace }
//   };
// }

// Or you can dispatch the action directly like that:-   // this is called a thunk. the evaluation of the function content has been delayed
export function changeSearchPlace(param) {
  return (dispatch, getState) => {
    console.log('getState: ', getState().get('searchPlace'));
    dispatch({
      type: types.CHANGE_SEARCH_PLACE,
      data: { searchPlace: 'directly dispatch actoin' }
    });
  };
}

// OR you can even dispatch the action like a thunk like that:-
// export function changeSearchPlace(param) {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch({
//         type: types.CHANGE_SEARCH_PLACE,
//         data: { searchPlace: 'thunk dispatch actoin' }
//       });
//     }, 2000);
//   };
// }

export function changeResultsNumber(resultsNumber) {
  return {
    type: types.CHANGE_RESULTS_NUMBER,
    data: { resultsNumber: resultsNumber }
  };
}
export function changeCategory(searchCategory) {
  return {
    type: types.CHANGE_CATEGORY,
    data: { searchCategory: searchCategory }
  };
}
export function updateResultsTableWithResults(searchCategory) {
  return {
    type: types.CHANGE_CATEGORY,
    data: { searchCategory: searchCategory }
  };
}

//this is how to call a thunk
export function ajaxCallThunk(param) {
  return dispatch => {
    setTimeout(() => {
      dispatch(changeSearchPlace('tanta' + param));
    }, 2000);
  };
}

// debouncing will delay the call to the function. & with each press of the key it will reset the timer & start the delay again.
let makePostalOfficesAjaxCall = debounce(_makePostalOfficesAjaxCall, 3000);
export function updateResultsTable(searchPlace) {
  return dispatch => {
    console.log(
      'debouncing will delay the call to the function. & with each press of the key it will reset the timer & start the delay again.'
    );
    makePostalOfficesAjaxCall(searchPlace, dispatch);
  };
}

function _makePostalOfficesAjaxCall(searchPlace, dispatch) {
  //TODO: ajax call is failing because server doesn't support cross-origin calls. please fix that
  dispatch({ type: 'Sending Axios Request' });
  axios
    .post('http://ahmed-badawy.com/site/projects/postaloffices/query-info', {
      q: searchPlace
    })
    .then(results => {
      console.log(results.data);
      // dispatch(updateResultsTableWithResults(result.data))
    });
}
