import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// components
import TopNav from './components/TopNav';
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
        <TopNav categories={categories}/>
      </MuiThemeProvider>
    );
  }
}

function matchStateToProps({ categories }){
  return { categories }
}

function matchDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories())
  }
}

export default connect(matchStateToProps, matchDispatchToProps)(App);
