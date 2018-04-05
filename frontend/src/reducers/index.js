import {
  UPDATE_CATEGORIES,
  GET_ALL_POSTS,
  GET_POST_BY_CATEGORY,
  GET_POST_BY_ID,
  GET_POST_COMMENTS,
  DELETE_POST,
  EDIT_POST,
  VOTE_POST_UP,
  VOTE_POST_DOWN,
  VOTE_COMMENT_UP,
  VOTE_COMMENT_DOWN,
  DELETE_COMMENT,
  EDIT_COMMENT,
  CREATE_COMMENT,
  SORT_POSTS
} from "../actions";
import { combineReducers } from "redux";

function categories(state = [], action) {
  return action.type === UPDATE_CATEGORIES ? action.categories : state;
}

function posts (state = [{}], action) {
  const payload = action.posts
  switch (action.type) {
    case GET_POST_BY_CATEGORY:
      return payload
    case GET_ALL_POSTS:
      return payload
    case GET_POST_BY_ID:
      return [payload]
    case GET_POST_COMMENTS:
      return addCommentsToPost(state, payload)
    case DELETE_POST:
      return deleteObjectInArray(state, payload.id)
    case EDIT_POST:
      return updateObjectInArray(state, payload, ['title', 'body'])
    case VOTE_POST_UP:
    case VOTE_POST_DOWN:
      return updateObjectInArray(state, payload, ['voteScore'])
    case SORT_POSTS:
      return state.slice().sort((current, next) => next[payload] - current[payload])
    default:
      return state
  }
}

function comments(state = [], action) {
  const payload = action.comments
  switch (action.type) {
    case GET_POST_COMMENTS:
      return payload
    case DELETE_COMMENT:
      return deleteObjectInArray(state, payload.id)
    case EDIT_COMMENT:
      return updateObjectInArray(state, payload, ['body', 'timestamp'])
    case VOTE_COMMENT_UP:
    case VOTE_COMMENT_DOWN:
      return updateObjectInArray(state, payload, ['voteScore'])
    case CREATE_COMMENT:
      return addObjectToArray(state, payload)
    default:
      return state
  }
}

function addCommentsToPost (posts, comments) {
  return posts.map(post => {
    if (post.id === getParentIdOfComments(comments)) {
      post.comments = comments
    }
    return post
  })
}

function getParentIdOfComments (comments) {
  return comments && comments[0] && comments[0].parentId
}

function updateObjectInArray (objects, payload, fields) {
  return objects.map(object => {
    if (object.id === payload.id) {
      fields.forEach(field => {
        object[field] = payload[field]
      })
    }
    return object
  })
}

function deleteObjectInArray (objects, id) {
  return objects.filter(object => {
    return object.id !== id
  })
}

function addObjectToArray (objects, newObject) {
  const newArray = objects.slice()
  newArray.push(newObject)
  return newArray
}

export default combineReducers({
  categories,
  posts,
  comments
});
