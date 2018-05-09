import React, { Component } from "react";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import api from "../utils/api";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
      category: undefined,
    }
  }

  handleCategoryChange = (event, index, category) => {
    this.setState({ category });
  };

  handleChange = (event, index) => {
    this.setState({ [event.target.id]: event.target.value })
  };

  submitNewPost = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    api.createPost(this.state).then(() => onSubmit())
  }

  render() {
    const { categories } = this.props;
    return (
      <Card key="new-post">
        <CardTitle title="New title" />
        <CardActions>
          <TextField 
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
            hintText="New title here" 
            floatingLabelText="New title" />
          <br />
          <TextField 
            id="body"
            value={this.state.body}
            onChange={this.handleChange}
            hintText="New body here" 
            floatingLabelText="New body" />
          <br />
          <TextField 
            id="author"
            value={this.state.author}
            onChange={this.handleChange}
            hintText="Author here" 
            floatingLabelText="Author" />
          <br />
          <SelectField
            id="category-new-post"
            floatingLabelText="Select a category"
            value={this.state.category}
            onChange={this.handleCategoryChange}
          >
            {categories.map(category => {
              return (
                <MenuItem
                  id={category.name}
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
          onClick={this.submitNewPost}
        />
      </Card>
    )
  }
}

export default NewPost;