import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ListView extends Component {
  render() {
    const { posts } = this.props;
    console.log('posts', posts)
    return (
      posts.map((post) => (
        <Card key={post.id}>
          <CardTitle title={post.title} subtitle={`posted in ${post.category} - by ${post.author}`}/>
          <CardText>
            {post.body}
          </CardText>
          {/* <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions> */}
        </Card>
      ))

    )
  }
}

export default ListView;