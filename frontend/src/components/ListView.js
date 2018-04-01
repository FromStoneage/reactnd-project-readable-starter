import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ListView extends Component {
  renderPost(post) {
    return (
      <Card key={post.id}>
        <CardTitle title={post.title} subtitle={`posted in ${post.category} - by ${post.author}`} />
        <CardText>
          {post.body}
        </CardText>
        <CardActions>
          <FlatButton label="Comment" />
          <FlatButton label="Delete" />
        </CardActions>
      </Card>
    )
  }

  render() {
    const { posts } = this.props;
    const category = this.props.match && this.props.match.match.params.category;
    if (category && posts) {
      return (
        posts.filter((p) => p.category === category).map((post) => this.renderPost(post))
      )
    }

    return (
      posts.map((post) => (
        this.renderPost(post)
      ))
    )
  }
}

export default ListView;