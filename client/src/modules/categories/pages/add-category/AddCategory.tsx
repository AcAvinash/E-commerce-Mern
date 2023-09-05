import React, {useEffect, useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as categoryActions from "../../../../redux/categories/categories.actions";
import * as categoryReducer from "../../../../redux/categories/categories.reducer";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import {Col, Container, Form, Row, Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import {CategoryResponseView, SubCategoryView} from "../../models/CategoryResponseView";
import * as userActions from "../../../../redux/users/users.actions";
import {CategoryRequestView} from "../../models/CategoryRequestView";

const AddCategory: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const [validated, setValidated] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<string>("");
    const [subCategory, setSubCategory] = useState<SubCategoryView>({
        name: "",
        description: ""
    });
    const [subCategories, setSubCategories] = useState<SubCategoryView[]>([]);



    const categoryReduxState: categoryReducer.InitialState = useSelector((state: RootState) => {
        return state[categoryReducer.categoryFeatureKey];
    });

    const {loading, categories} = categoryReduxState;

    useEffect(() => {
        dispatch(categoryActions.getAllCategoriesAction());
    }, [])

    const selectACategory = (e: React.ChangeEvent<HTMLSelectElement | any>) => {
        setCategoryId(e.target.value);
        setSubCategory({
            name: "",
            description: ""
        })
        if (categories.length > 0) {
            let category: CategoryResponseView | undefined = categories.find(category => category._id?.toString() === e.target.value);
            if (category && category.subCategories) {
                setSubCategories(category.subCategories);
            } else {
                setSubCategories([] as SubCategoryView[])
            }
        }
    };

    const updateInput = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        setSubCategory({
            ...subCategory,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement | any>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(categoryActions.createSubcategoryAction({
                category: subCategory,
                categoryId: categoryId
            })).then((response: any) => {
                if (response && !response.error) {
                    dispatch(categoryActions.getAllCategoriesAction());
                }
            });
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <>
            {loading && <SpinnerUI/>}
            <MainNavBar/>
            <LayoutHeading heading={'Add Sub-Categories'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Select
                                    required
                                    value={categoryId}
                                    onChange={e => selectACategory(e)}
                                >
                                    <option value="">Select a Category</option>
                                    {
                                        categories.map(category => {
                                            return (
                                                <option key={category._id} value={category._id}>{category.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={subCategory.name}
                                    onChange={e => updateInput(e)}
                                    name={'name'}
                                    type={'text'} placeholder={'SubCategory'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={subCategory.description}
                                    onChange={e => updateInput(e)}
                                    name={'description'}
                                    as="textarea" rows={3} placeholder={'Description'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Button variant={'success'} type={'submit'}>Create</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={4}>
                        <Card>
                            <Card.Header>
                                <p className="h6">Available Sub-Categories</p>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {
                                        subCategories.map(subCategory => {
                                            return (
                                                <ListGroupItem key={subCategory._id}>{subCategory.name}</ListGroupItem>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default AddCategory;