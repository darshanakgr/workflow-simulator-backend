import * as React from "react";
import "./Navbar.css";

interface NavbarState {
    username: string;
}

class NavBar extends React.Component<{}, NavbarState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: "Darshana"
        };
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0 text-center" href="/">WS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item px-3">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item px-3">
                            <a className="nav-link" href="/docs">Documentation</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item px-3">
                            <a className="nav-link" href="/dashboard">Sign up<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item px-3">
                            <a className="nav-link" href="/signin">Sign in</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;