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

  render() {
    return (
      <Card key={Math.random()}>
        <CardTitle title="New Comment" />
        <CardActions>
          <TextField hintText="New Comment here" floatingLabelText="New Comment" />
          <br />
          <TextField hintText="Author here" floatingLabelText="Author" />
          <br />
        </CardActions>
        <RaisedButton
          label="Create New Comment"
          onClick={() => console.log("submit")}
        />
      </Card>
    )
  }
}

export default NewComment;