import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from "react-router-dom";

class TopNav extends Component {
  handleCallToRouter = (value) => {
    this.props.history.replace(value);
  }

  render() {
    const { categories } = this.props;
    return (
      <Tabs
        value={this.props.history.location.pathname}
        onChange={this.handleCallToRouter}
      >
        <Tab
          label="home"
          value="/"
          key="home">
        </Tab>
        {categories.map((category) => (
          <Tab
            label={category.name}
            value={category.name}
            key={category.name}>
          </Tab>
        ))}

      </Tabs>
    )
  }
}

export default withRouter(TopNav);