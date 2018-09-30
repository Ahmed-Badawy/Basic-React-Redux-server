import { ActionTypes as types } from '../constants';

var defaultState = {
    searchPlace: "",
    resultsNumber: 25,
    searchCategory: "Post Offices"
};

function finder(state = defaultState, action) {
    switch (action.type) {
        case (types.CHANGE_SEARCH_PLACE): return { ...state, searchPlace: action.data.searchPlace }
        case (types.CHANGE_RESULTS_NUMBER): return { ...state, resultsNumber: action.data.resultsNumber }
        case (types.CHANGE_CATEGORY): return { ...state, searchCategory: action.data.searchCategory }
        default: return state;
    }
}

export default finder;
