import * as Api from '../utils/api';

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const UPDATE_POSTS = 'UPDATE_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

export const updateCategories = (categories) => ({
  type: UPDATE_CATEGORIES,
  categories
})

export const fetchCategories = () => (dispatch) => {
  Api
    .getAllCategories()
    .then(categories => dispatch(updateCategories(categories)))
}

export const updatePosts = (posts) => ({
  type: UPDATE_POSTS,
  posts
})

export const fetchPosts = () => (dispatch) => {
  Api
    .getAllPosts()
    .then(posts => dispatch(updatePosts(posts)))
}

export function addPost ({ title, body, author, category }) {
  return {
    type: ADD_POST,
    id: Math.random().toString(36).substr(20),
    timestamp: Date.now(),
    title: title,
    body: body,
    author: author,
    category: category,
  }
}

export function removePostById ({ id }) {
  return {
    type: DELETE_POST,
    id: id,
  }
}