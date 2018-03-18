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

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Home} />
                <Route path="/docs" component={Documentation} />
                <Route path="/signin" component={SignIn} />
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
