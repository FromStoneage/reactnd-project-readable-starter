import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
//actions
import {
  fetchPosts,
  fetchPostsByCategory,
  fetchPostsByPostId,
  fetchPostComments,
  votePostUp,
  votePostDown,
  voteCommentUp,
  voteCommentDown
} from "../actions";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      selectedCategory: undefined
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

  handleCategoryChange = (event, index, selectedCategory) => {
    this.setState({ selectedCategory });
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
          subtitle={`${comment.voteScore} score, by ${comment.author}`}
        />
        <RaisedButton
          label="↑"
          onClick={() => this.props.voteCommentUp(comment.id)}
        />
        <RaisedButton
          label="↓"
          onClick={() => this.props.voteCommentDown(comment.id)}
        />
        <RaisedButton label="Edit" />
        <RaisedButton label="Delete" />
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
          subtitle={`${post.voteScore} score, posted in ${post.category} - by ${
            post.author
          }`}
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
          <RaisedButton label="Delete" />
        </CardActions>

        <CardText expandable={true}>
          {comments.map(comment => this.renderComment(comment, post.id))}
        </CardText>
      </Card>
    );
  }

  renderNewPost() {
    const { categories } = this.props;
    console.log("categories", categories);
    return (
      <Card key={Math.random()}>
        <CardTitle title="New Post" />
        <CardActions>
          <TextField hintText="Title here" floatingLabelText="Title" />
          <br />
          <TextField
            multiLine={true}
            rows={4}
            hintText="Body here"
            floatingLabelText="Body"
          />
          <br />
          <TextField hintText="Author here" floatingLabelText="Author" />
          <br />
          <SelectField
            floatingLabelText="Select a category"
            value={this.state.selectedCategory}
            onChange={this.handleCategoryChange}
          >
            {categories.map(category => {
              return (
                <MenuItem
                  key={category.name}
                  value={category.name}
                  primaryText={category.name}
                />
              );
            })}
          </SelectField>
        </CardActions>
        <RaisedButton
          label="Create New Post"
          onClick={() => console.log('submit')}
        />
      </Card>
    );
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        {posts.map(post => this.renderPost(post))}
        {this.renderNewPost()}
      </div>
    );
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
    loadPostComments: postId => dispatch(fetchPostComments(postId)),
    votePostUp: postId => dispatch(votePostUp(postId)),
    votePostDown: postId => dispatch(votePostDown(postId)),
    voteCommentUp: commentId => dispatch(voteCommentUp(commentId)),
    voteCommentDown: commentId => dispatch(voteCommentDown(commentId))
  };
}

export default withRouter(
  connect(matchStateToProps, matchDispatchToProps)(ListView)
);
