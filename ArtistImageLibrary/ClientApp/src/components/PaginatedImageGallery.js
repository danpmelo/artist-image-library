import React, { PureComponent } from 'react';
import Pagination from '@material-ui/lab/Pagination'
import { Container, Row, Col, Media } from 'reactstrap';

export class PaginatedImageGallery extends PureComponent {
    static displayName = PaginatedImageGallery.name;

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = { imageCollection: {}, loading: true };
    }

    componentDidMount() {
        this.fetchImages();
    }

    renderGallery(imageCollection) {
        return (
            <Container>
                <Row className="align-items-center">
                    {imageCollection.images.slice(0, 4).map(image =>
                    <Col key={image.name} xs={3}>
                        <Media className="w-100 h-auto cursor-pointer" src={ image.path } onClick={event => this.props.onImageClick(event)} />
                    </Col>)}
                </Row>
                <Pagination page={this.page} count={imageCollection.pageCount} shape="rounded" className="mt-2 mx-auto w-fit" onChange={(_event, page) => this.pageChange(page)} />
            </Container>
        );
    }

    render() {
        return this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderGallery(this.state.imageCollection);
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
        this.setState({ imageCollection: null, loading: true });
        this.fetchImages();
    }
}
