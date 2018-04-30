import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dispatch, connect } from "react-redux";
import { signIn } from "../../services/user";
import { withRouter } from "react-router";
import { browserHistory } from "react-router";
import Alert from "./Alert";

interface SignInProps {
    dispatch: Dispatch<{}>;
}

class SignIn extends React.Component<SignInProps> {
    handleSignIn (e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const loginForm = ReactDOM.findDOMNode(this.refs.loginForm) as HTMLFormElement;
        if (loginForm.checkValidity()) {
            const email: string = (ReactDOM.findDOMNode(this.refs.email) as HTMLInputElement).value;
            const password: string = (ReactDOM.findDOMNode(this.refs.password) as HTMLInputElement).value;
            this.props.dispatch(signIn(email, password)).then(() => {
                browserHistory.push("/dashboard");
            });
        }
    }

    render() {
        return (
            <div>
                <div className="main login-container">
                    <div className="login">
                        <h2 style={{color: "#ecf0f1"}}>Login to your account</h2>
                        <Alert />
                        <form ref="loginForm" onSubmit={this.handleSignIn.bind(this)}>
                            <div className="form-group">
                                {/* <label htmlFor="groupId">Email</label> */}
                                <input ref="email" type="email" className="login-input" placeholder="someones@example.com" required/>
                            </div>
                            <div className="form-group">
                                {/* <label htmlFor="name">Password</label> */}
                                <input ref="password" type="password" className="login-input" placeholder="password" required/>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Sign In" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

export default withRouter(connect(mapStateToProps)(SignIn));
