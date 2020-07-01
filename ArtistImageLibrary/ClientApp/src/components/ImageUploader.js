import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class ImageUploader extends Component {
    static displayName = ImageUploader.name;

    constructor(props) {
        super(props);
        this.inputReference = React.createRef();
        this.state = { inputValue: '' };
    }

    render() {
        return (
            <div className="text-right">
                <input type="file" hidden ref={this.inputReference} accept="image/*" onChange={event => this.fileUploadInputChange(event)} value={this.state.inputValue} />
                <Button color="primary" onClick={() => this.fileUploadAction()}>
                    <svg width="1.5em" height="1.5em" viewBox="0 1 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                        <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
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
            method: "POST",
            body: formData
        }).then(response => {
            if (response.status === 200) {
                if (this.props.onUpload) {
                    this.props.onUpload();
                }
            }
            else {
                window.alert("The image couldn't be saved.");
                if (this.props.onError) {
                    this.props.onError();
                }
            }
        }).catch(() => {
            window.alert('An error has occurred while uploading the file.');
            if (this.props.onError) {
                this.props.onError();
            }
        }).finally(() => {
            this.setState({inputValue: ''});
        });
    }
}
