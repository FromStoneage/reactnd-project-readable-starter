import React, { Component } from "react";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      author: '',
    }
  }

  handleCommentChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };

  handleAuthorChange = (event) => {
    this.setState({
      author: event.target.value,
    });
  };

  render() {
    const { posts } = this.props;
    console.log('post', posts[0].id)
    return (
      <div>
      <Card key={posts[0].id}>
        <CardTitle title="New Comment" />
        <CardActions>
          <TextField 
            id="new-comment"
            value={this.state.comment}
            onChange={this.handleCommentChange}
            hintText="New Comment here" 
            floatingLabelText="New Comment" />
          <br />
          <TextField 
            id="new-comment-author"
            value={this.state.author}
            onChange={this.handleAuthorChange}
            hintText="Author here" 
            floatingLabelText="Author" />
          <br />
        </CardActions>
        <RaisedButton
          label="Create New Comment"
          onClick={() => console.log("submit")}
        />
      </Card>
      </div>
    )
  }
}

export default NewComment;