import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Media, Row, Col } from 'reactstrap';
import { RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';

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
                <ModalBody>
                    <Row>
                        <Col xs={9}>
                            <Media className={ `w-100 h-auto ${imageClass}` } src={this.props.src} />
                        </Col>
                        <Col xs={3}>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="colour" name="displayColour" value={this.state.displayColourValue} onChange={event => this.changeDisplayColour(event.target.value) }>
                                    <FormControlLabel value="original" control={<Radio color="primary" />} label="Original" />
                                    <FormControlLabel value="grayscale" control={<Radio color="primary" />} label="Black & White" />
                                </RadioGroup>
                            </FormControl>
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
}
