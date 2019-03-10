import { ActionTypes as types } from '../constants';

var defaultState = {
  searchPlace: '',
  resultsNumber: 25,
  searchCategory: 'Post Offices',
  articlesArray: []
};

// a reducer takes the (previousState ,action) as parameters & returns the newState. & it's very important that the reducer stays pure.
/* Things you should never do inside a reducer:
    - Mutate its arguments;
    - Perform side effects like API calls and routing transitions;
    - Call non-pure functions, e.g. Date.now() or Math.random().
*/

function finder(state = defaultState, action) {
  switch (action.type) {
  case types.CHANGE_SEARCH_PLACE:
    return { ...state, searchPlace: action.data.searchPlace };
  case types.CHANGE_RESULTS_NUMBER:
    return { ...state, resultsNumber: action.data.resultsNumber };
  case types.CHANGE_CATEGORY:
    return { ...state, searchCategory: action.data.searchCategory };
  default:
    return state;
  }
}

export default finder;
