import * as React from "react";
const cover = require("../img/cover.png");

class Home extends React.Component {
    render () {
        return (
            <div>
                <img className="cover" src={cover}/>
                <section className="text-center">
                    <p>With the advancement in distributed computing, workflow management systems have shifted towards executing processes on top of distributed and parallel information systems, resulting in distributed workflow management systems. Furthermore, in the present reuse-oriented software engineering era, developers tend to use existing software components or cloud services to build applications rather than developing as all new code. One such requirement in distributed workflow management systems is the monitoring of the progress and state of each of the tasks from a central location. End users should be able to track information of a particular workflow such as real-time status, anomalies and failures. However, it is challenging to find such platforms or services to remotely observe the progress or the state of a distributed workflow execution. Developers are required to build such monitoring modules from the ground up. In this paper, we attempt to design a cloud service which is capable of providing real-time monitoring for distributed workflow executions. The proposed solution provides a pluggable service module which enables remote monitoring of workflow execution, observation of current state and debugging of the service from a central location. The solution is presented as a simple API, where the developer is only required to invoke methods and publish the state, followed by the reception of such broadcasts from a remote user interface for monitoring. Furthermore, from the tests conducted it is evident that the system demonstrates simple real-time monitoring capabilities with improved performance.</p>
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