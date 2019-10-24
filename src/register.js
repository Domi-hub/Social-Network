import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    componentDidMount() {
        console.log(location);
    }
    register() {
        if (this.state.email.indexOf("@") == -1) {
            return this.setState({
                error: true
            });
        }

        axios
            .post("/register", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
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
                <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="lastName"
                    placeholder="Last Name"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.register()}>REGISTER</button>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
