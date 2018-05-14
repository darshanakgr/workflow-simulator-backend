import * as React from "react";
import { browserHistory, Route, Router, IndexRoute } from "react-router";
import "./App.css";

import Dashboard from "./dashboard/App";
import TaskGroup from "./dashboard/TaskGroup";
import Search from "./dashboard/Search";
import TaskGroupView from "./dashboard/TaskGroupView";
import Home from "./default/Home";
import Main from "./default/Main";
import SignIn from "./default/SignIn";
import SignUp from "./default/SignUp";
import SignOut from "./default/SignOut";
import Shared from "./dashboard/Shared";
import SharedView from "./dashboard/SharedView";
import Notification from "./dashboard/Notification";
import Documentation from "./default/Documentation";
import Settings from "./dashboard/Settings";

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Home} />
                <Route path="/docs" component={Documentation} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/dashboard" component={Dashboard}>
                  <IndexRoute component={TaskGroup} />
                  <Route path="/dashboard/taskgroup/:groupId" component={TaskGroupView} />
                  <Route path="/dashboard/search" component={Search} />
                  <Route path="/dashboard/shared" component={Shared} />
                  <Route path="/dashboard/shared/:groupId" component={SharedView} />
                  <Route path="/dashboard/notification" component={Notification} />
                  <Route path="/dashboard/settings" component={Settings} />
                </Route>
            </Route>
            <Route path="/signout" component={SignOut} />
        </Router>
      </div>
    );
  }
}

export default App;
