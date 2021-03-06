import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
//actions
import {
  fetchPosts,
  fetchPostsByCategory,
  fetchPostsByPostId,
  fetchPostComments,
  votePostUp,
  votePostDown,
  voteCommentUp,
  voteCommentDown,
  deleteComment,
  deletePost
} from "../actions";

import NewComment from "./NewComment";
import NewPost from "./NewPost";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSinglePostView: false,
      showComments: false,
      selectedCategory: undefined,
      sortBy: 'vote'
    };
  }

  componentWillMount() {
    const category = this.props.match && this.props.match.params.category;
    const postId = this.props.match && this.props.match.params.postId;
    if (postId) {
      this.props.loadPostById(postId);
      this.props.loadPostComments(postId);
      this.setState({ isSinglePostView: true });
    } else if (category) {
      this.props.loadPostsByCategory(category);
      this.setState({ isSinglePostView: false });
    } else {
      this.props.loadPosts();
      this.setState({ isSinglePostView: false });
    }
  }

  handleCallToRouter = post => {
    this.props.history.push(`/${post.category}/${post.id}`);
  };

  loadPostComments = post => {
    this.props.loadPostComments(post.id);
    this.setState({
      showComments: true
    });
  };

  renderComment(comment, postId) {
    return comment.parentId === postId ? (
      <Card key={comment.id}>
        <CardTitle
          title={comment.body}
          style={{ fontSize: "14px" }}
          subtitle={`${comment.voteScore} score, by ${comment.author}`} />
        <RaisedButton
          label="↑"
          onClick={() => {
            this.props.voteCommentUp(comment.id)
          }
            
          } />
        <RaisedButton
          label="↓"
          onClick={() => this.props.voteCommentDown(comment.id)} />
        <RaisedButton label="Edit" />
        <RaisedButton 
          label="Delete"
          onClick={() => this.props.deleteComment(comment.id)} />
      </Card>
    ) : (
      ""
    );
  }

  renderPost(post) {
    const { comments } = this.props;

    return (
      <Card key={Math.random()} expanded={this.state.showComments}>
        <CardTitle
          title={post.title}
          style={{ cursor: "pointer" }}
          onClick={() => this.handleCallToRouter(post)}
          subtitle={`${post.voteScore} score, posted in ${post.category} - by 
            ${post.author} on ${new Date(post.timestamp).toLocaleString()}`}
        />
        <CardText>{post.body}</CardText>
        <CardActions>
          <RaisedButton
            label="↑"
            onClick={() => this.props.votePostUp(post.id)}
          />
          <RaisedButton
            label="↓"
            onClick={() => this.props.votePostDown(post.id)}
          />
          <RaisedButton
            label={`Comment (${post.commentCount})`}
            onClick={() => this.loadPostComments(post)}
          />
          <RaisedButton label="Edit" />
          <RaisedButton 
            label="Delete"
            onClick={() => this.props.deletePost(post.id)}
          />
        </CardActions>

        <CardText expandable={true}>
          {comments.map(comment => this.renderComment(comment, post.id))}
        </CardText>
      </Card>
    );
  }

  render() {
    const { posts, categories } = this.props;

    const view = this.state.isSinglePostView ? (
      <NewComment posts={posts} />
    ) : (
      <NewPost categories={categories} onSubmit={this.props.loadPosts}  />
    )

    return (
      <div>
        <button onClick={() => this.setState({sortBy: 'vote'})}>Sort by Vote</button>
        <button onClick={() => this.setState({sortBy:'date'})}>Sort by Date</button>
        {posts.sort((f,s) => this.state.sortBy === 'date' ? s.timestamp - f.timestamp : s.voteScore - f.voteScore )
              .map(post => this.renderPost(post))}
        {view}
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, categories }) {
  return {
    posts,
    comments,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
    loadPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    loadPostById: postId => dispatch(fetchPostsByPostId(postId)),
    loadPostComments: postId => dispatch(fetchPostComments(postId)),
    votePostUp: postId => dispatch(votePostUp(postId)),
    votePostDown: postId => dispatch(votePostDown(postId)),
    voteCommentUp: commentId => dispatch(voteCommentUp(commentId)),
    voteCommentDown: commentId => dispatch(voteCommentDown(commentId)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    deletePost: postId => dispatch(deletePost(postId))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListView)
);
