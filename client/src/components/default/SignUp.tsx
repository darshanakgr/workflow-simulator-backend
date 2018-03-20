import * as React from "react";
import { Row, Col, Button, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import * as ReactDOM from "react-dom";
import { Dispatch, connect } from "react-redux";
import { signUp } from "../../services/user";
import { withRouter } from "react-router";
import Alert from "./Alert";
// import { browserHistory } from "react-router";

interface SignUpProps {
    dispatch: Dispatch<{}>;
}

class SignUp extends React.Component<SignUpProps> {
    handleSignUp () {
        const email: string = (ReactDOM.findDOMNode(this.refs.email) as HTMLInputElement).value;
        const password: string = (ReactDOM.findDOMNode(this.refs.password) as HTMLInputElement).value;
        this.props.dispatch(signUp(email, password));
    }

    render() {
        return (
            <div className="container main">
                <Alert />
                <form>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="email"
                                    placeholder="someone@example.com"
                                    ref="email"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    placeholder="password"
                                    ref="password"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Button bsStyle="primary" onClick={this.handleSignUp.bind(this)}>Sign up</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

export default withRouter(connect(mapStateToProps)(SignUp));
