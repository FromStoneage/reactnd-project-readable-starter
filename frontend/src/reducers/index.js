import { UPDATE_CATEGORIES } from '../actions';
import { combineReducers } from 'redux';


function categories (state = [], action) {
  return action.type === UPDATE_CATEGORIES ? action.categories : state
}

export default combineReducers({
  categories
})