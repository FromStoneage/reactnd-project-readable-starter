const api = "http://udacity.ljbayview.com"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const getPostById = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'DELETE'
  }).then(res => res.json())

export const editPost = (postId, data) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(res => res.json())

export const votePost = (vote, postId) => {
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: vote })
  }).then(res => console.log(res.json()))
}

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'DELETE'
  }).then(res => res.json())

export const editComment = (commentId, data) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(res => res.json())

export const voteComment = (vote) => (commentId) => {
  return fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: vote })
  }).then(res => res.json())
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8) // eslint-disable-line
    return v.toString(16)
  })
}

export const createComment = (data) => {
  data.timestamp = Date.now()
  data.id = generateUUID()

  return fetch(`${api}/comments/`, {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export const createPost = (data) => {
  data.timestamp = Date.now()
  data.id = generateUUID()

  return fetch(`${api}/posts/`, {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
}
