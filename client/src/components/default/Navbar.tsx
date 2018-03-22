import * as React from "react";
import "./Navbar.css";
import { Dispatch, connect } from "react-redux";
import { signOut } from "../../services/user";

interface NavbarProps {
    dispatch: Dispatch<{}>;
}

class NavBar extends React.Component<NavbarProps> {

    signOut() {
        this.props.dispatch(signOut());
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0 text-center" href="/">WS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item px-3">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item px-3">
                            <a className="nav-link" href="/docs">Documentation</a>
                        </li>
                    </ul>
                    {true ? (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item px-3">
                                <a className="nav-link btn" onClick={this.signOut.bind(this)}>Sign out</a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item px-3">
                            <a className="nav-link" href="/signup">Sign up</a>
                        </li>
                        <li className="nav-item px-3">
                            <a className="nav-link" href="/signin">Sign in</a>
                        </li>
                    </ul>
                    )}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

export default connect(mapStateToProps)(NavBar);