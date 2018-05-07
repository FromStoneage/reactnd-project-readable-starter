import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Route, withRouter, Switch } from "react-router-dom";

// components
import TopNav from "./components/TopNav";
import ListView from "./components/ListView";
// actions
import { fetchCategories } from "./actions";


class App extends Component {
  componentWillMount() {
    this.props.loadCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <TopNav categories={categories} />
          <Switch>
            <Route exact path="/" component={() => <ListView categories={categories} />} />
            <Route
              exact
              path="/:category"
              component={match => <ListView match={match} categories={categories} />}
            />
            <Route
              exact
              path="/:category/:postId"
              component={match => <ListView match={match} categories={categories} />}
            />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(fetchCategories())
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
