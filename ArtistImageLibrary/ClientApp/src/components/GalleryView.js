import React, { Component } from 'react';
import { PaginatedImageGallery } from './PaginatedImageGallery';
import { ImageModal } from './ImageModal';
import { ImageUploader } from './ImageUploader'

export class GalleryView extends Component {
    static displayName = GalleryView.name;
    
    constructor(props) {
        super(props);
        this.imageSrc = '';
        this.page = 1;

        this.state = { modal: false, imageCollection: {}, loading: true };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.fetchImages();
    }

    toggle() {
        this.setState(previousState => ({ modal: !previousState.modal }));
    }

    render() {
        return (
            <div>
                <ImageUploader onUpload={() => this.reloadGallery()} onStartUpload={() => this.closeModalAndSetLoading()} />
                <PaginatedImageGallery
                    onImageClick={event => this.loadAndOpenModal(event.target)}
                    loading={this.state.loading}
                    imageCollection={this.state.imageCollection}
                    page={this.page}
                    pageChange={() => this.pageChange()} />
                <ImageModal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    src={this.imageSrc}
                    onDelete={() => this.reloadGallery()} />
            </div>
        );
    }

    loadAndOpenModal(element) {
        this.imageSrc = element.src;
        this.toggle();
    }

    reloadGallery() {
        this.setState({ imageCollection: null, loading: true });
        this.fetchImages();
    }

    async fetchImages() {
        var params = new URLSearchParams();
        params.append('page', this.page);
        params.append('pageSize', 4);

        const response = await fetch('image?' + params);
        const data = await response.json();
        this.setState({ imageCollection: data, loading: false });
    }

    pageChange(page) {
        this.page = page;
        this.reloadGallery();
    }

    closeModalAndSetLoading() {
        this.setState({modal: false, loading: true});
    }


}
