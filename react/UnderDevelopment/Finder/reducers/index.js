/**
 * Combines all the reducers and exposes them as one data structure.
 */

import { combineReducers } from 'redux';

import finder from './finder';
import error from './error';

export default combineReducers({
    finder: finder,
    error: error
})
