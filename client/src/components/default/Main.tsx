import * as React from "react";
import Navbar from "./Navbar";

interface MainProps {
    isUserAuthenticated: boolean;
    toggleAuthentication: () => void;
}


class Main extends React.Component<MainProps> {
    render () {
        return (
            <div>
                <Navbar isUserAuthenticated={this.props.isUserAuthenticated} toggleAuthentication={() => this.props.toggleAuthentication()} />
                {this.props.children}
            </div>
        );
    }
}

export default Main;