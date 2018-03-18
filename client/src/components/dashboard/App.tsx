import * as React from "react";
import SideBar from "./SideBar";

class App extends React.Component {
    render () {
        return (
            <div>
                <SideBar />
                {this.props.children}
            </div>
        );
    }
}

export default App;