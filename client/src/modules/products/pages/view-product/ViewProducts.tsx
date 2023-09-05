import React, {useEffect} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, ListGroup, ListGroupItem, Row, Spinner} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as productActions from "../../../../redux/products/products.actions";
import * as productReducer from "../../../../redux/products/product.reducer";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import {ProductResponseView} from "../../models/ProductResponseView";
import {addToCartAction} from "../../../../redux/cart/cart.reducer";
import {CartReduxService} from "../../../../redux/cart/CartReduxService";

const ViewProducts: React.FC = () => {
    const {categoryName, productId} = useParams();
    const dispatch: AppDispatch = useAppDispatch();


    const productReduxState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey];
    });

    const {loading, product} = productReduxState;

    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProductAction({productId: productId}));
        }
    }, [productId]);

    const clickAddToCart = (product: ProductResponseView) => {
        dispatch({
            type: `${addToCartAction}`,
            payload: {product: CartReduxService.convertToTheProductEntity(product), count: 1}
        });
    };

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar></MainNavBar>
            <LayoutHeading heading={'Product Details'}/>
            {
                product && Object.keys(product).length > 0 &&
                <Container className="mt-3">
                    <Row>
                        <Col xs={4}>
                            <img src={product.imageUrl} alt="" className="img-fluid rounded-3 shadow-lg"/>
                            <Link to={`/products/${categoryName?.toLowerCase()}`} className="btn btn-warning mt-3">
                                <i className='bi bi-arrow-left-circle-fill'></i> Back
                            </Link>
                        </Col>
                        <Col xs={6}>
                            <ListGroup>
                                <ListGroupItem>Name : <span className="fw-bold">{product.title}</span></ListGroupItem>
                                <ListGroupItem>Brand : <span className="fw-bold">{product.brand}</span></ListGroupItem>
                                <ListGroupItem>Category : <span
                                    className="fw-bold">{product.categoryObj?.name}</span></ListGroupItem>
                                <ListGroupItem>Sub Category : <span
                                    className="fw-bold">{product.subCategoryObj?.name}</span></ListGroupItem>
                                <ListGroupItem>Brand : <span className="fw-bold">{product.brand}</span></ListGroupItem>
                                <ListGroupItem>Price : <span
                                    className="fw-bold">&#8377; {product.price}</span></ListGroupItem>
                                <ListGroupItem>Description : <span>{product.description}</span></ListGroupItem>
                            </ListGroup>
                            <Button variant={'warning'} className="mt-2" onClick={() => clickAddToCart(product)}>Add to
                                Cart</Button>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
};
export default ViewProducts;