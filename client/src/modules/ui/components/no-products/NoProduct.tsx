import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import noProductsImg from "../../../../assets/img/noimg.png";

const NoProduct: React.FC = () => {
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col xs={4} className="offset-4">
                        <img src={noProductsImg} alt="" className="img-fluid"/>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default NoProduct;