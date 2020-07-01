import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Media, Row, Col } from 'reactstrap';
import { RadioGroup, Radio, FormControl, FormControlLabel } from '@material-ui/core';

export class ImageModal extends Component {
    static displayName = ImageModal.name;

    constructor(props) {
        super(props);

        this.state = { displayColourValue: 'original' };
    }

    render() {
        const imageClass = this.state.displayColourValue === 'grayscale' ? 'grayscale' : '';

        return (
            <Modal className="image-modal" isOpen={this.props.isOpen} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Image view</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs={9}>
                            <Media className={ `mw-100 h-auto ${imageClass}` } src={this.props.src} />
                        </Col>
                        <Col xs={3}>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="colour" name="displayColour" value={this.state.displayColourValue} onChange={event => this.changeDisplayColour(event.target.value) }>
                                    <FormControlLabel value="original" control={<Radio color="primary" />} label="Original" />
                                    <FormControlLabel value="grayscale" control={<Radio color="primary" />} label="Black & White" />
                                </RadioGroup>
                            </FormControl>
                            <Button title="Delete image" close aria-label="Delete" onClick={_event => this.confirmDeleteImage()}>
                                <span aria-hidden>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </span>
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

    changeDisplayColour(displayColourValue) {
        this.setState({ displayColourValue: displayColourValue });
    }

    confirmDeleteImage() {
        if (window.confirm('Are you sure you want to delete this image?')) {
            this.deleteImage();
        }
    }

    async deleteImage() {
        var params = new URLSearchParams();
        params.append('path', this.props.src.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`, ''));

        fetch('image?' + params, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.status === 200) {
                if (this.props.onDelete) {
                    this.props.onDelete();
                }
                this.props.toggle();
            }
            else {
                window.alert("The image couldn't be deleted.");
            }
        }).catch(() => {
            window.alert('An error has occurred while deleting the file.');
        });
    }
}
