import React, {useEffect, useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import * as orderActions from "../../../../redux/orders/orders.actions";
import * as orderReducer from "../../../../redux/orders/orders.reducer";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import {Badge, Button, Col, Container, ListGroup, ListGroupItem, Row, Table, Form} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {OrderUtil} from "../../../../util/OrderUtil";
import NoProduct from "../../../ui/components/no-products/NoProduct";

const ManageOrders: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();


    const orderReduxState: orderReducer.InitialState = useSelector((state: RootState) => {
        return state[orderReducer.orderFeatureKey];
    });

    const {loading, orderProducts} = orderReduxState;

    const [newStatus, setNewStatus] = useState<{ orderId: string, orderStatus: string }>({
        orderId: "",
        orderStatus: ""
    });

    useEffect(() => {
        dispatch(orderActions.getAllOrdersAction());
    }, [])

    const updateInput = (event: React.ChangeEvent<any>, orderId: string) => {
        if (orderId) {
            setNewStatus({
                orderId: orderId,
                orderStatus: event.target.value
            });
        }
    };

    const clickUpdateStatus = (orderId: string | undefined) => {
        if (orderId) {
            if (newStatus.orderId === orderId) {
                const newOrderStatus = {
                    orderId: orderId,
                    orderStatus: newStatus.orderStatus
                };
                dispatch(orderActions.updateOrderStatusAction({
                    orderStatus: newStatus.orderStatus,
                    orderId: newOrderStatus.orderId
                })).then((response: any) => {
                    if (!response.error) {
                        dispatch(orderActions.getAllOrdersAction());
                    }
                });
            }
        }
    };

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Manage Orders'}/>
            {
                orderProducts && orderProducts.length > 0 ? <>
                    <Container fluid={true}>
                        <Row>
                            <Col>
                                <Table striped hover className="text-center shadow-lg">
                                    <thead className="bg-success text-white">
                                    <tr>
                                        <th>Order Number</th>
                                        <th>Order Details</th>
                                        <th>Order Placed On</th>
                                        <th></th>
                                        <th>Total Amount</th>
                                        <th>Payment Type</th>
                                        <th>Order Status</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        orderProducts.map(order => {
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>
                                                        <ListGroup>
                                                            {
                                                                order.products.map(item => {
                                                                    return (
                                                                        <ListGroupItem key={item._id}>
                                                                            <Row>
                                                                                <Col xs={2}>
                                                                                    <img src={item?.imageUrl}
                                                                                         alt="" width={25} height={25}/>
                                                                                </Col>
                                                                                <Col xs={8}>
                                                                                    <Link
                                                                                        className="text-decoration-none text-success"
                                                                                        to={`/products/view/Fashion/${item._id}`}>{item.title}</Link>
                                                                                </Col>
                                                                            </Row>
                                                                        </ListGroupItem>
                                                                    )
                                                                })
                                                            }
                                                        </ListGroup>
                                                    </td>
                                                    <td>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                                    <td>{order.orderBy?.username}</td>
                                                    <td>&#8377; {Number(order.grandTotal).toFixed(2)}</td>
                                                    <td>{order.paymentType}</td>
                                                    <td className="fw-bold">
                                                        {
                                                            order.orderStatus === "Order Placed" &&
                                                            <Badge bg={'info'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Processing" &&
                                                            <Badge bg={'primary'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Dispatched" &&
                                                            <Badge bg={'success'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Delivered" &&
                                                            <Badge bg={'warning'}
                                                                   className="text-dark">{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Cancelled" &&
                                                            <Badge bg={'danger'}>{order.orderStatus}</Badge>
                                                        }
                                                        {
                                                            order.orderStatus === "Completed" &&
                                                            <Badge bg={'success'}>{order.orderStatus}</Badge>
                                                        }
                                                    </td>
                                                    <td>
                                                        <Form.Select disabled={order.orderStatus === "Completed"}
                                                                     onChange={e => updateInput(e, order._id)}>
                                                            {
                                                                OrderUtil.getOrderStatuses().map((item, index) => {
                                                                    return (
                                                                        <option
                                                                            value={item}>{item}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </td>
                                                    <td>
                                                        <Button variant={'warning'}
                                                                onClick={() => clickUpdateStatus(order._id)}>Update</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </> : <>
                    <NoProduct/>
                </>
            }
        </>
    )
};
export default ManageOrders;