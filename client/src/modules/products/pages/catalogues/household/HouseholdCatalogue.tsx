import React, {useEffect, useState} from 'react';
import {CategoryResponseView, SubCategoryView} from "../../../../categories/models/CategoryResponseView";
import MainNavBar from "../../../../layout/pages/navbar/MainNavBar";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import LayoutHeading from "../../../../layout/components/layout-heading/LayoutHeading";
import {AppDispatch, RootState, useAppDispatch} from "../../../../../redux/store";
import {ProductResponseView} from "../../../models/ProductResponseView";
import * as productReducer from "../../../../../redux/products/product.reducer";
import {useSelector} from "react-redux";
import * as categoryReducer from "../../../../../redux/categories/categories.reducer";
import * as categoriesAction from "../../../../../redux/categories/categories.actions";
import * as productActions from "../../../../../redux/products/products.actions";
import SpinnerUI from "../../../../ui/components/spinner/SpinnerUI";
import {Link} from "react-router-dom";
import NoProduct from "../../../../ui/components/no-products/NoProduct";
import {addToCartAction} from "../../../../../redux/cart/cart.reducer";
import {CartReduxService} from "../../../../../redux/cart/CartReduxService";
import ProductSideBar from "../../../../categories/components/ProductSidebar";


const HouseholdCatalogue: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const [filterLoading, setFilterLoading] = useState<boolean>(false);
    const [subCategories, setSubCategories] = useState<SubCategoryView[]>([]);
    const [category, setCategory] = useState<CategoryResponseView>({} as CategoryResponseView);
    const [products, setProducts] = useState<ProductResponseView[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductResponseView[]>([]);

    // get products data from store
    const productReduxState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey];
    });

    // get categories data from store
    const categoryReduxState: categoryReducer.InitialState = useSelector((state: RootState) => {
        return state[categoryReducer.categoryFeatureKey];
    });

    const {loading, products: reduxProducts} = productReduxState;
    const {categories} = categoryReduxState;

    useEffect(() => {
        dispatch(categoriesAction.getAllCategoriesAction());
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            const category: CategoryResponseView | undefined = categories.find(item => item.name.toLowerCase().trim().includes("household"));
            if (category) {
                setCategory(category);
                if (category.subCategories) {
                    setSubCategories(category.subCategories.map(item => {
                        return {
                            _id: item._id,
                            name: item.name,
                            description: item.description,
                            isChecked: true
                        }
                    }));
                }
            }
        }
    }, [categories]);

    useEffect(() => {
        if (category && Object.keys(category).length > 0) {
            dispatch(productActions.getAllProductsWithCategoryIdAction({categoryId: category._id}))
        }
    }, [category])

    useEffect(() => {
        if (reduxProducts.length > 0) {
            setProducts(reduxProducts);
            setFilteredProducts(reduxProducts);
        }
    }, [reduxProducts])

    const filterTheProducts = (subCategories: SubCategoryView[]) => {
        let subs = subCategories.map(item => {
            if (item.isChecked) {
                return item._id;
            }
        }).filter(item => item !== undefined);
        setFilterLoading(true);
        setTimeout(() => {
            setFilteredProducts(products.filter(item => subs.includes(item?.subCategoryObj?._id)));
            setFilterLoading(false);
        }, 300);
    };

    const clickAddToCart = (product: ProductResponseView) => {
        dispatch({
            type: `${addToCartAction}`,
            payload: {product: CartReduxService.convertToTheProductEntity(product), count: 1}
        });
    };

    return (
        <>
            {(loading || filterLoading) && <SpinnerUI/>}
            <MainNavBar/>
            <Container fluid>
                <Row>
                    <Col xs={1}>

                        <ProductSideBar subCategories={subCategories} setSubCategories={setSubCategories}
                                        filteredTheProducts={filterTheProducts}/>
                    </Col>
                    <Col className="product-layout">
                        <LayoutHeading heading={'Household Catalogue'}/>
                    </Col>
                </Row>
            </Container>
            {
                filteredProducts && filteredProducts.length > 0 &&
                <Container>
                    <Row>
                        {
                            filteredProducts.map((product) => {
                                return (
                                    <Col xs={3} key={product._id} className="mb-3 text-center ">
                                        <Card>
                                            <Card.Header className="fashion-products">
                                                <Link to={`/products/view/${category.name}/${product._id}`}>
                                                    <img src={product.imageUrl} alt="" width={180}
                                                         className="text-center m-auto d-block" height={180}/>
                                                </Link>
                                            </Card.Header>
                                            <Card.Body>
                                                <small className="fw-bold text-success">{product.title}</small><br/>
                                                <small
                                                    className="fw-bold text-danger">&#8377; {Number(product.price).toFixed(2)}</small><br/>
                                                <Button variant={'warning'} size={'sm'}
                                                        onClick={() => clickAddToCart(product)}>Add to Cart</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            }
            {
                products.length === 0 &&
                <NoProduct/>
            }
        </>
    )
};
export default HouseholdCatalogue;