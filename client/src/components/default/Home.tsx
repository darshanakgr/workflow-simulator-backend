import * as React from "react";
const cover = require("../img/cover.png");

class Home extends React.Component {
    render () {
        return (
            <div>
                <img className="cover" src={cover}/>
                <section className="text-center">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <button type="button" className="btn btn-lg btn-outline-info">Get Started ></button>
                </section>
                <section className="features">
                    <h1 className="heading">Features</h1>
                    <div className="row">
                        <div className="col feature ">
                            <div className="circle" style={{backgroundColor: "#e74c3c"}}>
                                <i className="material-icons">schedule</i>
                            </div>
                            <h3>Real-time Monitoring</h3>
                        </div>
                        <div className="col feature">
                            <div className="circle" style={{backgroundColor: "#2ecc71"}}>
                                <i className="material-icons">group</i>
                            </div>
                            <h3>Team sharing</h3>
                        </div>
                        <div className="col feature">
                        <div className="circle" style={{backgroundColor: "#9b59b6"}}>
                                <i className="material-icons">touch_app</i>
                            </div>
                            <h3>Easy Setup</h3>
                        </div>
                    </div>
                </section>

                <section>
                    <h1 className="heading">About Us</h1>
                    <p>A group of engineering students from University of Moratuwa decided to work on designing better websites and discovering more efficient ways to build applications. With time their work became more streamlined, and WIT Innovations was born.</p>
                </section>
            </div>
        );
    }
}

export default Home;