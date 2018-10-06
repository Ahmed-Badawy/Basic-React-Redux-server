import { ActionTypes as types } from '../constants';

var defaultState = {
    errorMsg: ''
}

function error(state = defaultState, action) {
    switch (action.type) {
        default: return state;
    }
}


export default error;
