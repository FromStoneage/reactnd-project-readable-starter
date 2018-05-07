import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
      selectedCategory: undefined,
    }
  }

  handleCategoryChange = (event, index, selectedCategory) => {
    this.setState({ selectedCategory });
  };

  render() {
    const { categories } = this.props;
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
          onClick={() => console.log("submit")}
        />
      </Card>
    )
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(NewPost);