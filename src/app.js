import React from "react";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";
import axios from "./axios";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            imageUrl: "",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    async componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
                imageUrl: data.image_url
            });
        });
    }

    toggleModal() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    setImage(imageUrl) {
        this.setState({ imageUrl: imageUrl });
    }

    render() {
        return (
            <div>
                <h1 onClick={this.toggleModal}>Hello from App!</h1>
                <ProfilePic
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    imageUrl={this.state.imageUrl}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </div>
        );
    }
}
