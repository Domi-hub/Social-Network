import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = <img src="saturn.jpg" />;
}

ReactDOM.render(elem, document.querySelector("main")); // we are rendering the component, inject all our react code to html
