import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
//actions
import { fetchPosts, fetchPostsByCategory } from "../actions";

class ListView extends Component {
  componentWillMount() {
    const category = this.props.match && this.props.match.match.params.category;
    if (category) {
      this.props.lostPostsByCategory(category);
    } else {
      this.props.loadPosts();
    }
  }

  renderPost(post) {
    return (
      <Card key={post.id}>
        <CardTitle
          title={post.title}
          subtitle={`posted in ${post.category} - by ${post.author}`}
        />
        <CardText>{post.body}</CardText>
        <CardActions>
          <FlatButton label="Comment" />
          <FlatButton label="Delete" />
        </CardActions>
      </Card>
    );
  }

  render() {
    const { posts } = this.props;
    console.log(posts)
    // const category = this.props.match && this.props.match.match.params.category;
    // if (category && posts) {
    //   return (
    //     posts.filter((p) => p.category === category).map((post) => this.renderPost(post))
    //   )
    // }

    return posts.map(post => this.renderPost(post));
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
    lostPostsByCategory: category => dispatch(fetchPostsByCategory(category))
  };
}

export default connect(matchStateToProps, matchDispatchToProps)(ListView);
