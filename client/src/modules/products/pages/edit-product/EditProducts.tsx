import React, {useEffect, useRef, useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as productActions from "../../../../redux/products/products.actions";
import * as productReducer from "../../../../redux/products/product.reducer";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {CategoryResponseView, SubCategoryView} from "../../../categories/models/CategoryResponseView";
import {ProductRequestView} from "../../models/ProductRequestView";
import * as categoryActions from "../../../../redux/categories/categories.actions";
import {UploadImageWidget} from "../../../../util/UploadImageWidget";
import * as categoryReducer from "../../../../redux/categories/categories.reducer";

const EditProducts: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const {productId} = useParams();


    const productReduxState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey];
    });


    const categoryReduxState: categoryReducer.InitialState = useSelector((state: RootState) => {
        return state[categoryReducer.categoryFeatureKey];
    });

    const {loading: categoryLoading, categories} = categoryReduxState;

    const {loading, product: productRedux} = productReduxState;

    const navigate = useNavigate();

    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();

    const [validated, setValidated] = useState<boolean>(false);
    const [subCategories, setSubCategories] = useState<SubCategoryView[]>([]);
    const [product, setProduct] = useState<ProductRequestView>({
        imageUrl: "",
        title: "",
        description: "",
        categoryId: "",
        subCategoryId: "",
        price: "",
        quantity: "",
        brand: ""
    });

    useEffect(() => {
        dispatch(categoryActions.getAllCategoriesAction());
        // upload Image
        UploadImageWidget.upload(cloudinaryRef, widgetRef).then((imageUrl) => {
            if (imageUrl) {
                setProduct({...product, imageUrl: imageUrl.toString()})
            }
        }).catch((errorMessage) => {
            console.log(errorMessage);
        });
    }, [])

    useEffect(() => {
        if (productId) {
            dispatch(productActions.getProductAction({productId: productId}))
        }
    }, [productId])

    useEffect(() => {
        if (productRedux && Object.keys(productRedux).length > 0) {
            setProduct({
                imageUrl: productRedux.imageUrl,
                title: productRedux.title,
                description: productRedux.description,
                categoryId: productRedux.categoryObj._id,
                subCategoryId: productRedux.subCategoryObj._id,
                price: productRedux.price.toString(),
                quantity: productRedux.quantity.toString(),
                brand: productRedux.brand,
            })
        }
    }, [productRedux])

    const selectACategory = (e: React.ChangeEvent<HTMLSelectElement | any>) => {
        setProduct({...product, categoryId: e.target.value});
        if (categories.length > 0) {
            let category: CategoryResponseView | undefined = categories.find(category => category._id?.toString() === e.target.value);
            if (category && category.subCategories) {
                setSubCategories(category.subCategories);
            } else {
                setSubCategories([] as SubCategoryView[])
            }
        }
    };

    /**
     * when subCategory is selected
     * @param event
     */
    const selectSubCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct({...product, subCategoryId: event.target.value})
    };

    const updateInput = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };

    const clickUploadImageButton = () => {
        widgetRef.current.open();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement | any>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            if (productId) {
                dispatch(productActions.updateProductAction({
                    product: product,
                    productId: productId
                })).then((response: any) => {
                    if (response && !response.error) {
                        navigate("/products/admin");
                    }
                });
            }
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <>
            {(loading || categoryLoading) && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Edit Product'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Button variant={"warning"} type={'button'} onClick={clickUploadImageButton}>Upload
                                    Image</Button>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Select
                                    required
                                    value={product.categoryId}
                                    onChange={e => selectACategory(e)}
                                >
                                    <option value="">Select Category</option>
                                    {
                                        categories.length > 0 && categories.map(item => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Select
                                    required
                                    value={product.subCategoryId}
                                    onChange={e => selectSubCategory(e)}
                                    name={'subCategoryId'}
                                >
                                    <option value="">Select Sub Category</option>
                                    {
                                        subCategories.length > 0 && subCategories.map(item => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={product.title}
                                    onChange={e => updateInput(e)}
                                    name={'title'}
                                    type={'text'} placeholder={'Title'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={product.brand}
                                    onChange={e => updateInput(e)}
                                    name={'brand'}
                                    type={'text'} placeholder={'Brand'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={product.description}
                                    onChange={e => updateInput(e)}
                                    name={'description'}
                                    as="textarea" rows={3} placeholder={'Description'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={product.price}
                                    onChange={e => updateInput(e)}
                                    name={'price'}
                                    type={'number'} placeholder={'Price'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={product.quantity}
                                    onChange={e => updateInput(e)}
                                    name={'quantity'}
                                    type={'number'} placeholder={'Qty'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button type={'submit'} variant={'success'}>Update</Button>
                                <Link to={'/products/admin'} className="btn btn-dark ms-2">Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={3}>
                        <img src={product.imageUrl} alt="" className="img-fluid rounded-3 shadow-lg"/>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default EditProducts;