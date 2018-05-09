import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {
  createComment
} from "../actions";

const DEFAULT_STATE = {
  comment: '',
  author: '',
}

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE
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

  newComment = (event) => {
    const { posts } = this.props
    
    const data = {
      body: this.state.comment,
      author: this.state.author,
      parentId: posts[0].id
    }
    this.props.createComment(data);

    event.preventDefault()

    this.setState(DEFAULT_STATE)
  }

  render() {
    const { posts } = this.props;
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
          onClick={this.newComment.bind(this)}
        />
      </Card>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: data => dispatch(createComment(data))
  };
}

export default connect(mapDispatchToProps)(NewComment);