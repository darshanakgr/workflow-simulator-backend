import * as React from "react";
import SideBar from "./SideBar";
import Alert from "../default/Alert";

class App extends React.Component {
    render () {
        return (
            <div>
                <SideBar />
                <div  className="main offset-md-2">
                    <Alert />
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;