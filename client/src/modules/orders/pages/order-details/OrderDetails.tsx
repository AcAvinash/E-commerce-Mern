import React from 'react';
import * as orderReducer from "../../../../redux/orders/orders.reducer";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import orderImg from "../../../../assets/img/order-success.png";
import {Link} from "react-router-dom";

const OrderDetails: React.FC = () => {


    const orderReduxState: orderReducer.InitialState = useSelector((state: RootState) => {
        return state[orderReducer.orderFeatureKey];
    });

    const {loading, orderProduct} = orderReduxState;

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Order Details'}/>
            {
                orderProduct && Object.keys(orderProduct).length > 0 &&
                <Container>
                    <Row>
                        <Col xs={3}>
                            <img src={orderImg} alt="" className="rounded-circle img-fluid"/>
                        </Col>
                        <Col xs={8}>
                            <ListGroup>
                                <ListGroupItem className="fw-bold text-success">
                                    Order is placed Successfully
                                </ListGroupItem>
                                <ListGroupItem>
                                    Order Number : <span className="fw-bold">{orderProduct._id.toUpperCase()}</span>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Total Amount : <span
                                    className="fw-bold">&#8377; {Number(orderProduct.grandTotal).toFixed(2)}</span>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Order Status : <span className="fw-bold">{orderProduct.orderStatus}</span>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Payment mode : <span className="fw-bold">{orderProduct.paymentType}</span>
                                </ListGroupItem>
                            </ListGroup>

                            <Link to={'/products/fashion'}>
                                <Button variant={'warning'} className="mt-3">Continue Shopping</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
};
export default OrderDetails;