import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        if (this.state.email.indexOf("@") == -1) {
            return this.seState({
                error: true
            });
        }

        axios
            .post("/register", {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                if (res.status === 200) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">Oops! That was your fault</div>
                )}
                <input name="email" onChange={e => this.handleChange(e)} />
                <input name="password" onChange={e => this.handleChange(e)} />
                <button onClick={() => this.submit()}>submit</button>
                <Link to="/">Click here to Register!</Link>
            </div>
        );
    }
}
