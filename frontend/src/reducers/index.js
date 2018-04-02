import { UPDATE_CATEGORIES, UPDATE_POSTS } from "../actions";
import { combineReducers } from "redux";

function categories(state = [], action) {
  return action.type === UPDATE_CATEGORIES ? action.categories : state;
}

function posts(state = [], action) {
  return action.type === UPDATE_POSTS ? action.posts : state;
}

export default combineReducers({
  categories,
  posts
});
