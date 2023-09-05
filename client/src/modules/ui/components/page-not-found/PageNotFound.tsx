import React from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import {Col, Container, Row} from "react-bootstrap";
import notfoundImg from "../../../../assets/img/404-not-found.png";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";

const PageNotFound: React.FC = () => {
    return (
        <>
            <MainNavBar/>
            <LayoutHeading heading={'Page Not Found'}/>
            <Container className="mt-5">
                <Row>
                    <Col xs={4} className="offset-4">
                        <img src={notfoundImg} alt="" className="img-fluid"/>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default PageNotFound;