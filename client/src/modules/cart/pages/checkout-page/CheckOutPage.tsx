import React, {useEffect} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import * as userActions from "../../../../redux/users/users.actions";
import * as cartActions from "../../../../redux/cart/cart.actions";
import * as userReducer from "../../../../redux/users/user.reducer";
import * as cartReducer from "../../../../redux/cart/cart.reducer";
import * as orderActions from "../../../../redux/orders/orders.actions";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import {CartReduxService} from '../../../../redux/cart/CartReduxService';
import {OrderProduct, OrderRequestView} from "../../../orders/models/OrderRequestView";
import {TheProduct} from "../../models/CartResponseView";
import {clearCartAction} from "../../../../redux/cart/cart.reducer";

const CheckOutPage: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    // get user data from redux store
    const userReduxState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    // get the cart data from redux store
    const cartReduxState: cartReducer.InitialState = useSelector((state: RootState) => {
        return state[cartReducer.cartFeatureKey];
    });

    const {loading, address, user} = userReduxState;
    const {loading: cartLoading, cartProduct} = cartReduxState;

    useEffect(() => {
        dispatch(userActions.getAddressAction());
        dispatch(cartActions.getCartInfoAction());
    }, []);

    const getOrderProducts = (products: TheProduct[]): OrderProduct[] => {
        return products.map(product => {
            return {
                product: product._id,
                count: product.count,
                price: product.price
            }
        });
    };

    const clickPlaceOrder = () => {
        if (user._id) {
            const order: OrderRequestView = {
                products: getOrderProducts(cartProduct.products),
                total: CartReduxService.calculateTotal(cartProduct.products),
                tax: CartReduxService.calculateTax(cartProduct.products),
                grandTotal: CartReduxService.calculateGrandTotal(cartProduct.products),
                orderBy: user._id,
                paymentType: "COD"
            };
            dispatch(orderActions.placeOrderAction({order: order})).then((response: any) => {
                if (response && !response.error) {
                    navigate('/orders/details');
                    dispatch({
                        type: `${cartReducer.clearCartAction}`
                    });
                }
            })
        }
    };

    return (
        <>
            {(loading || cartLoading) && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Checkout Here'} icon={'bi-cart-fill'}/>
            <Container className="mt-3">
                <Row>
                    {
                        address && Object.keys(address).length > 0 &&
                        <Col xs={8}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success text-white d-flex justify-content-between">
                                    <h3>Shipping Address</h3>
                                    <Link to={`/users/edit-shipping-address/${address._id}`}>
                                        <Button variant={'primary'}>
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                    </Link>
                                </Card.Header>
                                <Card.Body className="bg-light-grey">
                                    <ListGroup>
                                        <ListGroupItem>
                                            Name : <span className="fw-bold">{address.name}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Mobile : <span className="fw-bold">{address.mobile}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Email : <span className="fw-bold">{address.email}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Flat : <span className="fw-bold">{address.flat}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Street : <span className="fw-bold">{address.street}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Landmark : <span className="fw-bold">{address.landmark}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            City : <span className="fw-bold">{address.city}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            State : <span className="fw-bold">{address.state}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Country : <span className="fw-bold">{address.country}</span>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            Pincode : <span className="fw-bold">{address.pinCode}</span>
                                        </ListGroupItem>

                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    }
                    {
                        cartProduct && Object.keys(cartProduct).length > 0 &&
                        <Col xs={4}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success text-white">
                                    <h3>Your Cart</h3>
                                </Card.Header>
                                <Card.Body className="bg-light-grey">
                                    <ListGroup>
                                        {
                                            cartProduct.products && cartProduct.products.map((item, index) => {
                                                return (
                                                    <ListGroupItem key={item._id}>
                                                        <Row>
                                                            <Col xs={3}>
                                                                <img src={item.imageUrl} alt="" width={100}
                                                                     height={100} className="img-fluid"/>
                                                            </Col>
                                                            <Col xs={9}>
                                                                <small>{item.title}</small><br/>
                                                                <small>count : {item.count}</small><br/>
                                                                <small>price
                                                                    : &#8377; {Number(item.price).toFixed(2)}</small>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                    <ListGroup className="mt-2">
                                        <ListGroupItem>Total
                                            : <span
                                                className="fw-bold">
                                                &#8377; {CartReduxService.calculateTotal(cartProduct.products).toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Tax : <span className="fw-bold">
                                             &#8377; {CartReduxService.calculateTax(cartProduct.products).toFixed(2)}
                                        </span></ListGroupItem>
                                        <ListGroupItem>Grand Total : <span className="fw-bold">
                                             &#8377; {CartReduxService.calculateGrandTotal(cartProduct.products).toFixed(2)}
                                        </span></ListGroupItem>
                                    </ListGroup>

                                    <div className="d-grid">
                                        <Button variant={'warning'} className="mt-2" onClick={clickPlaceOrder}>Place
                                            Order</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    }
                </Row>
            </Container>
        </>
    )
};
export default CheckOutPage;