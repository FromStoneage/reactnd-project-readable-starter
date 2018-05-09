import Api from "../utils/api";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_POST_BY_CATEGORY = "GET_POST_BY_CATEGORY";
export const GET_POST_BY_ID = "GET_POST_BY_ID";
export const GET_POST_COMMENTS = "GET_POST_COMMENTS";
export const VOTE_POST_UP = "VOTE_POST_UP";
export const VOTE_POST_DOWN = "VOTE_POST_DOWN";
export const VOTE_COMMENT_UP = "VOTE_COMMENT_UP";
export const VOTE_COMMENT_DOWN = "VOTE_COMMENT_DOWN";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const SORT_POSTS = "SORT_POSTS";

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
});

export const updateCommentVote = (type, comments) => ({
  type,
  comments
});

export const fetchCategories = () => dispatch => {
  Api.getAllCategories().then(categories =>
    dispatch(updateCategories(categories))
  );
};

export const fetchPosts = () => dispatch => {
  Api.getAllPosts().then(posts => dispatch(updatePosts(GET_ALL_POSTS, posts)));
};

export const fetchPostsByCategory = category => dispatch => {
  Api.getPostsByCategory(category).then(posts =>
    dispatch(updatePosts(GET_POST_BY_CATEGORY, posts))
  );
};

export const fetchPostsByPostId = postId => dispatch => {
  Api.getPostById(postId).then(posts =>
    dispatch(updatePosts(GET_POST_BY_ID, posts))
  );
};

export const fetchPostComments = postId => dispatch => {
  Api.getPostComments(postId).then(comments =>
    dispatch(updatePostComments(comments))
  );
};

export const votePostUp = postId => dispatch => {
  Api.votePostUp(postId).then(post => {
    dispatch(updatePosts(VOTE_POST_UP, post));
  });
};

export const votePostDown = postId => dispatch => {
  Api.votePostDown(postId).then(post =>
    dispatch(updatePosts(VOTE_POST_DOWN, post))
  );
};

export const voteCommentUp = commentId => dispatch => {
  Api.voteCommentUp(commentId).then(comment =>
    dispatch(updateCommentVote(VOTE_COMMENT_UP, comment))
  );
};

export const voteCommentDown = commentId => dispatch => {
  Api.voteCommentDown(commentId).then(comment =>
    dispatch(updateCommentVote(VOTE_COMMENT_DOWN, comment))
  );
};

export const deleteComment = commentId => dispatch => {
  Api.deleteComment(commentId).then(id => 
    dispatch(updateCommentVote(DELETE_COMMENT, id))
  );
};

export const createComment =  data => dispatch => {
  Api.createComment(data).then(comment =>
    dispatch(updateCommentVote(CREATE_COMMENT, comment))
  );
};

export const deletePost = postId => dispatch => {
  Api.deletePost(postId).then(id => 
    dispatch(updatePosts(DELETE_POST, id))
  );
};

