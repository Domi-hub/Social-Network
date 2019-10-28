import React from "react";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";
import axios from "./axios";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import { OtherProfile } from "./otherprofile";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            imageUrl: "",
            bio: "",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    async componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
                imageUrl: data.image_url,
                bio: data.bio
            });
        });
    }

    toggleModal() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    setImage(imageUrl) {
        this.setState({ imageUrl: imageUrl });
    }

    setBio(bio) {
        this.setState({ bio: bio });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Profile
                                    id={this.state.id}
                                    firstName={this.state.firstName}
                                    lastName={this.state.lastName}
                                    imageUrl={this.state.imageUrl}
                                    onClick={this.showUploader}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/user/:id"
                            component={OtherProfile}
                        />
                    </div>

                    <div className="main">
                        <img className="profileLogo" src="/logo1.jpg" />
                        <ProfilePic
                            imageUrl={this.state.imageUrl}
                            onClick={this.toggleModal}
                        />
                    </div>

                    <div className="body">
                        {this.state.uploaderIsVisible && (
                            <Uploader setImage={this.setImage} />
                        )}
                    </div>
                    <footer>Dominika Tazikova 2019</footer>
                </div>
            </BrowserRouter>
        );
    }
}
