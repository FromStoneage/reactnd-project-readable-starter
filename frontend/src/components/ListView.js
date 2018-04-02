import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { withRouter } from "react-router-dom";
//actions
import {
  fetchPosts,
  fetchPostsByCategory,
  fetchPostsByPostId,
  fetchPostComments
} from "../actions";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false
    };
  }

  componentWillMount() {
    const category = this.props.match && this.props.match.params.category;
    const postId = this.props.match && this.props.match.params.postId;
    if (postId) {
      this.props.loadPostById(postId);
      this.props.loadPostComments(postId);
    } else if (category) {
      this.props.loadPostsByCategory(category);
    } else {
      this.props.loadPosts();
    }
  }

  handleCallToRouter = post => {
    this.props.history.push(`/${post.category}/${post.id}`);
  };

  loadPostComments = post => {
    this.props.loadPostComments(post.id);
    console.log("loading post", this.state.showComments);
    this.setState({
      showComments: true
    });

    console.log("loading post", this.state.showComments);
  };

  renderComment(comment, postId) {
    return comment.parentId == postId ? (
      <div key={comment.id}>
        <p>{comment.body}</p>
        by -
        <span> {comment.author}</span>
        <br />
        score: {comment.voteScore}
      </div>
    ) : (
      ""
    );
  }

  renderPost(post) {
    const { comments } = this.props;

    return (
      <Card key={post.id} expanded={this.state.showComments}>
        <CardTitle
          title={post.title}
          style={{ cursor: "pointer" }}
          onClick={() => this.handleCallToRouter(post)}
          subtitle={`${post.voteScore} score, posted in ${post.category} - by ${
            post.author
          }`}
        />
        <CardText>{post.body}</CardText>
        <CardActions>
          <RaisedButton label="↑" />
          <RaisedButton label="↓" />
          <RaisedButton
            label={`Comment (${post.commentCount})`}
            onClick={() => this.loadPostComments(post)}
          />
          <RaisedButton label="Edit" />
          <RaisedButton label="Delete" />
        </CardActions>

        <CardText expandable={true}>
          {comments.map(comment => this.renderComment(comment, post.id))}
        </CardText>
      </Card>
    );
  }

  render() {
    const { posts } = this.props;

    if (posts.length) {
      return posts.map(post => this.renderPost(post));
    }
    // super hacky render single post
    return this.renderPost(posts);
  }
}

function matchStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  };
}

function matchDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
    loadPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    loadPostById: postId => dispatch(fetchPostsByPostId(postId)),
    loadPostComments: postId => dispatch(fetchPostComments(postId))
  };
}

export default withRouter(
  connect(matchStateToProps, matchDispatchToProps)(ListView)
);
