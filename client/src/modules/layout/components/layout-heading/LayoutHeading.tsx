import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

interface IProps {
    heading: string;
    icon?: string;
}

const LayoutHeading: React.FC<IProps> = (props) => {
    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <p className="h4 text-success">
                            <i className={`bi ${props.icon}`}></i> {props.heading}</p>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
                            enim exercitationem
                            facilis fuga maiores, nemo nisi perferendis quae quia quos sequi soluta voluptate
                            voluptates! Impedit officia quam quos saepe voluptates. A commodi deserunt distinctio id
                            laboriosam nulla tempore temporibus, velit!</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default LayoutHeading;