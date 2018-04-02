import { UPDATE_CATEGORIES, UPDATE_POSTS, GET_POST_COMMENTS } from "../actions";
import { combineReducers } from "redux";

function categories(state = [], action) {
  return action.type === UPDATE_CATEGORIES ? action.categories : state;
}

function posts(state = [], action) {
  return action.type === UPDATE_POSTS ? action.posts : state;
}

function comments(state = [], action) {
  return action.type === GET_POST_COMMENTS ? action.comments : state;
}

export default combineReducers({
  categories,
  posts,
  comments
});
