import React, { Component } from 'react';
import { PaginatedImageGallery } from './PaginatedImageGallery';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

export class GalleryView extends Component {
    static displayName = GalleryView.name;
    
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = { modal: false };
    }

    toggle = () => this.setState({ modal: !this.state.modal });

    render() {
        return (
            <div>
                <PaginatedImageGallery onImageClick={event => this.loadAndOpenModal(event.target)} />
                <Modal>

                </Modal>
            </div>
        );
    }

    loadAndOpenModal(element) {
        if (element.naturalWidth) {
            const width = element.naturalWidth;
            this.toggle();
        }
    }
}
