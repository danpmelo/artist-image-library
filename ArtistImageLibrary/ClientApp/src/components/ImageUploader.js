import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';

export class ImageUploader extends Component {
    static displayName = ImageUploader.name;

    constructor(props) {
        super(props);
        this.inputReference = React.createRef();
    }

    componentDidMount() {
        this.fetchImages();
    }

    toggle() {
        this.setState(previousState => ({ modal: !previousState.modal }));
    }

    render() {
        return (
            <div className="text-right">
                <Input type="file" hidden ref={this.inputReference} accept="image/*" onChange={event => this.fileUploadInputChange(event)} />
                <Button color="primary">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                        <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
                    </svg> Upload Image
                </Button>
            </div>
        );
    }

    fileUploadAction() {
        this.inputReference.current.click();
    }

    fileUploadInputChange(event) {
        if (this.props.onStartUpload) {
            this.props.onStartUpload();
        }
        this.fileUpload(event.target.files);
    }

    async fileUpload(files) {
        const formData = new FormData()
        formData.append('myFile', files[0])

        fetch('image', {
            method: "POST"
        }).then(response => {
            if (response.status === 200) {
                if (this.props.onUpload) {
                    this.props.onUpload();
                }
            }
            else {
                window.alert("The image couldn't be saved.");
            }
        }).catch(() => {
            window.alert('An error has occurred while uploading the file.');
        });
    }
}
