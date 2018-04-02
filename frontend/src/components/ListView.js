import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { withRouter } from "react-router-dom";
//actions
import {
  fetchPosts,
  fetchPostsByCategory,
  fetchPostsByPostId
} from "../actions";

class ListView extends Component {
  componentWillMount() {
    const category = this.props.match && this.props.match.params.category;
    const postId = this.props.match && this.props.match.params.postId;
    if (postId) {
      this.props.loadPostById(postId);
    } else if (category) {
      this.props.loadPostsByCategory(category);
    } else {
      this.props.loadPosts();
    }
  }

  handleCallToRouter = post => {
    this.props.history.replace(`${post.category}/${post.id}`);
  };

  renderPost(post) {
    return (
      <Card key={post.id}>
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
          <RaisedButton label={`Comment (${post.commentCount})`} />
          <RaisedButton label="Edit" />
          <RaisedButton label="Delete" />
        </CardActions>
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

function matchStateToProps({ posts }) {
  return {
    posts
  };
}

function matchDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(fetchPosts()),
    loadPostsByCategory: category => dispatch(fetchPostsByCategory(category)),
    loadPostById: postId => dispatch(fetchPostsByPostId(postId))
  };
}

export default withRouter(
  connect(matchStateToProps, matchDispatchToProps)(ListView)
);
