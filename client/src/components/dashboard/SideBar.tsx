import * as React from "react";
import "./Sidebar.css";

class NavBar extends React.Component {

    constructor(props: any) {
        super(props);
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
                                <span data-feather="package" />
                                Task Group
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/search">
                                <span data-feather="search" />
                                Search
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/shared">
                                <span data-feather="share-2" />
                                Shared With Me
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/notification">
                                <span data-feather="bell" />
                                Notification
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard/settings">
                                <span data-feather="settings" />
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