import {
  UPDATE_CATEGORIES,
  GET_ALL_POSTS,
  GET_POST_BY_CATEGORY,
  GET_POST_BY_ID,
  GET_POST_COMMENTS
} from "../actions";
import { combineReducers } from "redux";

function categories(state = [], action) {
  return action.type === UPDATE_CATEGORIES ? action.categories : state;
}

function posts(state = [], action) {
  switch (action.type) {
    case GET_ALL_POSTS:
    case GET_POST_BY_CATEGORY:
      return action.posts;
      break;
    case GET_POST_BY_ID:
      return [action.posts];
      break;
    default:
      return state;
  }
}

function comments(state = [], action) {
  return action.type === GET_POST_COMMENTS ? action.comments : state;
}

export default combineReducers({
  categories,
  posts,
  comments
});
