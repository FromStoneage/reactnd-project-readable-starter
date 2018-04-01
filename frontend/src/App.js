import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom';

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
        <Route exact path='/' render={() => (
          <div>
            <TopNav
              categories={categories}
            />
            <ListView
              posts={posts}
            />
          </div>
        )} />
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

export default connect(matchStateToProps, matchDispatchToProps)(App);
