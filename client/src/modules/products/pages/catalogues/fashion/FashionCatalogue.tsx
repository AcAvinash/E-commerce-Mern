import React, {useEffect, useState} from 'react';
import MainNavBar from "../../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../../layout/components/layout-heading/LayoutHeading";
import {Col, Container, Row, Card, Button} from "react-bootstrap";
import ProductSideBar from "../../../../categories/components/ProductSidebar";
import {CategoryResponseView, SubCategoryView} from "../../../../categories/models/CategoryResponseView";
import NoProduct from "../../../../ui/components/no-products/NoProduct";
import {AppDispatch, RootState, useAppDispatch} from "../../../../../redux/store";
import * as productActions from "../../../../../redux/products/products.actions";
import * as categoriesAction from "../../../../../redux/categories/categories.actions";
import * as productReducer from "../../../../../redux/products/product.reducer";
import * as categoryReducer from "../../../../../redux/categories/categories.reducer";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../../ui/components/spinner/SpinnerUI";
import {ProductResponseView} from "../../../models/ProductResponseView";
import {Link} from "react-router-dom";
import {addToCartAction} from "../../../../../redux/cart/cart.reducer";
import {CartReduxService} from "../../../../../redux/cart/CartReduxService";

const FashionCatalogue: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const [filterLoading, setFilterLoading] = useState<boolean>(false);
    const [subCategories, setSubCategories] = useState<SubCategoryView[]>([]);
    const [category, setCategory] = useState<CategoryResponseView>({} as CategoryResponseView);
    const [products, setProducts] = useState<ProductResponseView[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductResponseView[]>([]);


    const productReduxState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey];
    });


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
            const category: CategoryResponseView | undefined = categories.find(item => item.name.toLowerCase().trim().includes("fashion"));
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
                        <LayoutHeading heading={'Fashion Catalogue'}/>
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
                                                         className="text-center m-auto d-block" height={200}/>
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
export default FashionCatalogue;