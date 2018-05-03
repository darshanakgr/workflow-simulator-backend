import * as React from "react";
import Navbar from "./Navbar";
import DialogBox from "./DialogBox";

class Main extends React.Component {
    render () {
        return (
            <div>
                <DialogBox />
                <Navbar />
                {this.props.children}
            </div>
        );
    }
}

export default Main;