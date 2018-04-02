import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, withRouter } from 'react-router-dom';

// components
import TopNav from './components/TopNav';
import ListView from './components/ListView';
// actions
import { fetchCategories } from './actions';

class App extends Component {
  componentWillMount() {
    this.props.loadCategories()
  }

  render() {
    const { categories } = this.props
    return (
      <MuiThemeProvider>
        <div>
          <TopNav categories={categories} />
          <Route exact path='/' component={() => (
            <ListView />
          )} />
          <Route exact path='/:category' component={(match) => (
            <ListView match={match} />
          )} />
          <Route exact path='/:category/:postId' component={(match) => (
            <ListView match={match} />
          )} />
        </div>
      </MuiThemeProvider>
    );
  }
}

function matchStateToProps({ categories }) {
  return {
    categories
  }
}

function matchDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(matchStateToProps, matchDispatchToProps)(App));
