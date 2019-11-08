import React from "react";
import Register from "./register";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";

export default function Welcome() {
    return (
        <div className="welcome">
            <h1>Welcome to Lemonade</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

//logo: <img className="welcome-logo" src="/logo1.jpg" />
