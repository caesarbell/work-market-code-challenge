import { combineReducers } from 'redux';
import questions from './questions';
import user from './user'

/**
 * Combines the reducers so you can call
 * props.{ reducer name } to use the reducer you want
 */

 export default combineReducers({
     questions,
     user
 });