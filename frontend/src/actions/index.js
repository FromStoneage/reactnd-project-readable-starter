import * as Api from "../utils/api";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_POST_BY_CATEGORY = "GET_POST_BY_CATEGORY";
export const GET_POST_BY_ID = "GET_POST_BY_ID";
export const GET_POST_COMMENTS = "GET_POST_COMMENTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";

export const updateCategories = categories => ({
  type: UPDATE_CATEGORIES,
  categories
});

export const updatePosts = (type, posts) => ({
  type,
  posts
});

export const updatePostComments = comments => ({
  type: GET_POST_COMMENTS,
  comments
})

export const fetchCategories = () => dispatch => {
  Api.getAllCategories().then(categories =>
    dispatch(updateCategories(categories))
  );
};

export const fetchPosts = () => dispatch => {
  Api.getAllPosts().then(posts => dispatch(updatePosts(GET_ALL_POSTS, posts)));
};

export const fetchPostsByCategory = category => dispatch => {
  Api.getPostsByCategory(category).then(posts => dispatch(updatePosts(GET_POST_BY_CATEGORY, posts)));
};

export const fetchPostsByPostId = postId => dispatch => {
  Api.getPostById(postId).then(posts => dispatch(updatePosts(GET_POST_BY_ID, posts)));
};

export const fetchPostComments = postId => dispatch => {
  Api.getPostComments(postId).then(comments =>
    dispatch(updatePostComments(comments))
  );
};

export function addPost({ title, body, author, category }) {
  return {
    type: ADD_POST,
    id: Math.random()
      .toString(36)
      .substr(20),
    timestamp: Date.now(),
    title: title,
    body: body,
    author: author,
    category: category
  };
}

export function removePostById({ id }) {
  return {
    type: DELETE_POST,
    id: id
  };
}
