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

  render() {
    const { categories } = this.props;
    console.log('post', categories)
    return (
      <Card key="new-post">
        <CardTitle title="New title" />
        <CardActions>
          <TextField 
            id="new-title"
            hintText="New title here" 
            floatingLabelText="New title" />
          <br />
          <TextField 
            id="new-body"
            hintText="New body here" 
            floatingLabelText="New body" />
          <br />
          <TextField 
            id="new-comment-author"
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
          label="Create New Comment"
          onClick={() => console.log("submit")}
        />
      </Card>
    )
  }
}

export default NewPost;