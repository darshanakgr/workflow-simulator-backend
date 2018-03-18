import * as React from "react";
import "./Sidebar.css";

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
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard">
                                <span data-feather="home" />
                                Task Group
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/search">
                                <span data-feather="file" />
                                Search
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/shared">
                                <span data-feather="file" />
                                Shared With Me
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/notification">
                                <span data-feather="file" />
                                Notification
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/settings">
                                <span data-feather="file" />
                                Settings
                                </a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default NavBar;