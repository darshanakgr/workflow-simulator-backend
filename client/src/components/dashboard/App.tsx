import * as React from "react";
import SideBar from "./SideBar";

class App extends React.Component {
    render () {
        return (
            <div>
                <SideBar />
                <div  className="main offset-md-2">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;