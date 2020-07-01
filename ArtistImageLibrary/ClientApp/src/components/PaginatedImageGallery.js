import React, { Component } from 'react';
import Pagination from '@material-ui/lab/Pagination'
import { Container, Row, Col, Media } from 'reactstrap';

export class PaginatedImageGallery extends Component {
    static displayName = PaginatedImageGallery.name;

    renderGallery(imageCollection) {
        return (
            <Container className={this.props.className}>
                <Row className="align-items-center">
                    {imageCollection.images.slice(0, 4).map(image =>
                    <Col key={image.name} xs={3}>
                        <Media className="mw-100 h-auto cursor-pointer" src={ image.path } onClick={event => this.props.onImageClick(event)} />
                    </Col>)}
                </Row>
                <Pagination page={this.props.page} count={imageCollection.pageCount} shape="rounded" className="mt-2 mx-auto w-fit" onChange={(_event, page) => this.props.pageChange(page)} />
            </Container>
        );
    }

    render() {
        return this.props.loading
            ? <p><em>Loading...</em></p>
            : this.renderGallery(this.props.imageCollection);
    }
}
