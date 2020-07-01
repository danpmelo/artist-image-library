import React, { Component } from 'react';
import { PaginatedImageGallery } from './PaginatedImageGallery';
import { ImageModal } from './ImageModal';

export class GalleryView extends Component {
    static displayName = GalleryView.name;
    
    constructor(props) {
        super(props);
        this.modalWidth = 400;
        this.imageSrc = '';

        this.state = { modal: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(previousState => ({ modal: !previousState.modal }));
    }

    render() {
        return (
            <div>
                <PaginatedImageGallery onImageClick={event => this.loadAndOpenModal(event.target)} />
                <ImageModal isOpen={this.state.modal} toggle={this.toggle} src={this.imageSrc} />
            </div>
        );
    }

    loadAndOpenModal(element) {
        this.imageSrc = element.src;
        this.toggle();
    }
}
