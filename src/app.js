import React from "react";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Pete",
            last: "Anderson",
            img: "",
            uploaderIsVisible: false
        };
        this.toggleMOdal = this.toggleModal.bind(this);
    }

    componentDidMOunt() {
        console.log("App mounted");
        //this is where we want to make an axios request
        //a GET request to a route called "/user"
        //when we get a response we want to put the info into state...
        //this.setState
    }
    toggleModal() {
        console.log("I am toggleModal...");

        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });

        // if (this.state.uploaderIsVisible) {
        //     this.setState({ uploaderIsVisible: false });
        // } else {
        //     this.setState({ uploaderIsVisible: true });
        // }
    }
    methodInApp(muffin) {
        console.log("I am a method running in APP!");
        console.log("muffin: ", muffin);
        this.setState({ muffin: muffin });
    }

    render() {
        // use it as sanity check
        return (
            <React.Fragment>
                <div on Click={this.toggleMOdal}>
                    Hello from App!
                </div>
                <ProfilePic
                    firstName={this.state.first}
                    lastName={this.state.first}
                    imgUrl={this.state.img}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </React.Fragment>
        );
    }
}
