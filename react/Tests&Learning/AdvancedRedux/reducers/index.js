/**
 * Combines all the reducers and exposes them as one data structure.
 */


import finder from './finder';
import error from './error';


    //this is how we combine Reducers Normally
    import { combineReducers } from 'redux';
    export default combineReducers({ finder: finder, error: error })



//custom combine reducer to support immutable.js functionality
// const customCombineReducers = (config) =>{
//     return (state,action)=>{
//         return Object.keys(config).reduce((state,key)=>{
//             const reducer = config[key];
//             const previousState = state.get(key);
//             const newValue = reducer(previousState,action);
//             if (!newValue) { throw new Error(`A reducer returned undefined when reducing key::"${key}"`); }
//             return state.set(key,newValue);
//         },state);
//     };
// }

// export default customCombineReducers({ finder,error });
