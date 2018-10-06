/**
 * Combines all the reducers and exposes them as one data structure.
 */


import finder from './finder';
import error from './error';


    //this is how we combine Reducers Normally
    import { combineReducers } from 'redux';
    export default combineReducers({ finder: finder, error: error })

