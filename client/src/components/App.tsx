import * as React from "react";
import { browserHistory, Route, Router, IndexRoute } from "react-router";
import "./App.css";

import Dashboard from "./dashboard/App";
import TaskGroup from "./dashboard/TaskGroup";
import Search from "./dashboard/Search";
import TaskGroupView from "./dashboard/TaskGroupView";
// import Shared from "./dashboard/Shared";
import Documentation from "./default/Documentation";
import Home from "./default/Home";
import Main from "./default/Main";
import SignIn from "./default/SignIn";
import SignUp from "./default/SignUp";
import Auth from "../services/auth";

interface AppState {
  isUserAuthenticated: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
        isUserAuthenticated: false
    };
  }

  toggleAuthentication() {
    this.setState({
        isUserAuthenticated: Auth.isUserAuthenticated()
    });
  }

  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
            <Route path="/" render={() => <Main isUserAuthenticated={this.state.isUserAuthenticated} toggleAuthentication={() => this.toggleAuthentication()} />}>
                <IndexRoute component={Home} />
                <Route path="/docs" component={Documentation} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/dashboard" component={Dashboard}>
                  <IndexRoute component={TaskGroup} />
                  <Route path="/dashboard/taskgroup/:groupId" component={TaskGroupView} />
                  <Route path="/dashboard/search" component={Search} />
                </Route>
            </Route>
        </Router>
      </div>
    );
  }
}

export default App;
