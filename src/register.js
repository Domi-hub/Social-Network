import React from "react";
import axios from "axios";

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

    submit() {
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
                    window.location.replace("/");
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
                <input name="firstName" onChange={e => this.handleChange(e)} />
                <input name="lastName" onChange={e => this.handleChange(e)} />
                <input name="email" onChange={e => this.handleChange(e)} />
                <input name="password" onChange={e => this.handleChange(e)} />
                <button onClick={() => this.submit()}>submit</button>
            </div>
        );
    }
}
