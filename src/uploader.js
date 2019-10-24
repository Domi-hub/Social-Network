import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMOunt() {
        console.log("uploader mounted!!");
        console.log("this.props", this.props);
    }
    muffinMaker() {
        this.props.methodInApp("Lots of muffins...");
    }
    render() {
        return (
            <div>
                <h3 onClick={() => this.muffinMaker()}>
                    This is my uploader component!!!
                </h3>
            </div>
        );
    }
}
