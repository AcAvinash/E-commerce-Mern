import React from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Table} from "react-bootstrap";
import * as cartReducer from "../../../../redux/cart/cart.reducer";
import {decrProductQtyAction, deleteCartItemAction, incrProductQtyAction} from "../../../../redux/cart/cart.reducer";
import * as cartActions from "../../../../redux/cart/cart.actions";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {CartReduxService} from "../../../../redux/cart/CartReduxService";
import NoProduct from "../../../ui/components/no-products/NoProduct";
import {CartRequestView} from "../../models/CartRequestView";
import {useNavigate} from "react-router-dom";
import * as userReducer from "../../../../redux/users/user.reducer";
import {UserView} from '../../../users/models/UserView';


const CartPage: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    // get the cart information from redux store
    const cartReduxState: cartReducer.InitialState = useSelector((state: RootState) => {
        return state[cartReducer.cartFeatureKey];
    });

    //get data from redux
    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    const {user} = userState;

    const clickIncrQty = (productId: string | undefined) => {
        if (productId) {
            dispatch({
                type: `${incrProductQtyAction}`,
                payload: {productId: productId}
            });
        }
    };

    const clickDecrQty = (productId: string | undefined) => {
        if (productId) {
            dispatch({
                type: `${decrProductQtyAction}`,
                payload: {productId: productId}
            });
        }
    };

    const clickDeleteProduct = (productId: string | undefined) => {
        if (productId) {
            dispatch({
                type: `${deleteCartItemAction}`,
                payload: {productId: productId}
            });
        }
    };

    const {cartProduct} = cartReduxState;
    const {products} = cartProduct;

    const prepareCartRequestObject = (user: UserView): CartRequestView => {
        return {
            products: products.map(product => {
                return {
                    product: product._id,
                    count: product.count,
                    price: product.price
                }
            }),
            tax: CartReduxService.calculateTax(products),
            total: CartReduxService.calculateTotal(products),
            grandTotal: CartReduxService.calculateGrandTotal(products),
            userObj: user?._id
        };
    };

    const clickCheckout = () => {
        if (user && Object.keys(user).length > 0) {
            dispatch(cartActions.createCartAction({cart: prepareCartRequestObject(user)})).then((response: any) => {
                if (response && !response.error) {
                    navigate('/cart/checkout');
                }
            });
        }
    };

    return (
        <>
            <MainNavBar/>
            <LayoutHeading heading={'Your Cart'} icon={'bi-cart-fill'}/>
            {
                cartProduct.products && cartProduct.products.length > 0 &&

                <Container className="mt-3">
                    <Row>
                        <Col xs={9}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success text-white">
                                    <p className="h4">Cart Items</p>
                                </Card.Header>
                                <Card.Body className="bg-light-grey">
                                    <Table striped hover className="text-center">
                                        <thead className='bg-warning'>
                                        <tr>
                                            <th>SNO</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            products && products.map((product, index) => {
                                                return (
                                                    <tr key={product._id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img src={product.imageUrl} alt="" width={50}
                                                                 height={50}/>
                                                        </td>
                                                        <td>{product.title}</td>
                                                        <td>&#8377;{product.price}</td>
                                                        <td>
                                                            <i onClick={() => clickDecrQty(product._id)}
                                                               className="bi bi-dash-circle-fill me-1"></i>
                                                            {product.count}
                                                            <i className="bi bi-plus-circle-fill ms-1"
                                                               onClick={() => clickIncrQty(product._id)}></i>
                                                        </td>
                                                        <td>&#8377;{product.price * product.count}</td>
                                                        <td>
                                                            <Button variant={'danger'}
                                                                    onClick={() => clickDeleteProduct(product._id)}>
                                                                <i className="bi bi-trash-fill"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3}>
                            <Card className="shadow-lg">
                                <Card.Header className="bg-success text-white">
                                    <p className="h4">Cart Items</p>
                                </Card.Header>
                                <Card.Body className="bg-light-grey">
                                    <ListGroup>
                                        <ListGroupItem>Total
                                            : <span
                                                className="fw-bold">
                                                &#8377; {CartReduxService.calculateTotal(products).toFixed(2)}</span></ListGroupItem>
                                        <ListGroupItem>Tax : <span className="fw-bold">
                                             &#8377; {CartReduxService.calculateTax(products).toFixed(2)}
                                        </span></ListGroupItem>
                                        <ListGroupItem>Grand Total : <span className="fw-bold">
                                             &#8377; {CartReduxService.calculateGrandTotal(products).toFixed(2)}
                                        </span></ListGroupItem>
                                    </ListGroup>
                                    <div className="d-grid gap-2 mt-3">
                                        <Button variant='warning' onClick={clickCheckout}>Checkout</Button>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            }
            {
                products && products.length === 0 &&
                <NoProduct/>
            }
        </>
    )
};
export default CartPage;