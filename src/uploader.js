import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            image: null
        };
    }

    upload() {
        var form = new FormData();
        form.append("image", this.state.image);

        axios
            .post("/upload", form)
            .then(res => {
                this.props.setImage(res.data.imageUrl);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="uploader">
                <input
                    name="image"
                    type="file"
                    placeholder="Image"
                    accept="image/*"
                    onChange={e =>
                        this.setState({
                            image: e.target.files[0]
                        })
                    }
                />
                <button onClick={() => this.upload()}>UPLOAD</button>
            </div>
        );
    }
}
