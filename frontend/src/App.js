import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, withRouter } from 'react-router-dom';

// components
import TopNav from './components/TopNav';
import ListView from './components/ListView';
// actions
import { fetchCategories, fetchPosts } from './actions';

class App extends Component {
  componentWillMount() {
    this.props.loadCategories()
    this.props.loadPosts()
  }

  render() {
    const { categories, posts } = this.props
    return (
      <MuiThemeProvider>
        <div>
          <Route exact path='/' component={() => (
            <div>
              <TopNav categories={categories} />
              <ListView
                posts={posts}
              />
            </div>
          )} />
          <Route path='/:category' component={(match) => (
            <div>
              <TopNav categories={categories} />
              <ListView
                posts={posts}
                match={match}
              />
            </div>
          )} />

        </div>
      </MuiThemeProvider>
    );
  }
}

function matchStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function matchDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories()),
    loadPosts: () => dispatch(fetchPosts())
  }
}

export default withRouter(connect(matchStateToProps, matchDispatchToProps)(App));
