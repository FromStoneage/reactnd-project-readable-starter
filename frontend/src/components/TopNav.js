import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

class TopNav extends Component {
  render() {
    const { categories } = this.props;
    console.log('categories', categories);
    return (
      <Tabs>
        {categories.map((category) => (
          <Tab label={category.name} key={category.name}>
            <div>
            </div>
          </Tab>
        ))}

      </Tabs>
    )
  }
}

export default TopNav;