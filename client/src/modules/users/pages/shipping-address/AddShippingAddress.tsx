import React, {useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {AddressView} from "../../models/AddressView";
import * as userActions from "../../../../redux/users/users.actions";
import {AppDispatch, useAppDispatch} from "../../../../redux/store";

const AddShippingAddress: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState<boolean>(false);

    const [address, setAddress] = useState<AddressView>({
        mobile: "",
        flat: "",
        landmark: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    } as AddressView);

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | any>) => {
        setAddress({
            ...address,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement | any>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(userActions.createNewAddressAction({address: address})).then((response: any) => {
                if (response && !response.error) {
                    navigate("/users/profile");
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
            <MainNavBar/>
            <LayoutHeading heading={'Add Shipping Address'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.mobile}
                                    onChange={e => updateInput(e)}
                                    name={'mobile'}
                                    type={'number'} placeholder={'Mobile'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.flat}
                                    onChange={e => updateInput(e)}
                                    name={'flat'}
                                    type={'text'} placeholder={'Flat'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.landmark}
                                    onChange={e => updateInput(e)}
                                    name={'landmark'}
                                    type={'text'} placeholder={'Landmark'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.street}
                                    onChange={e => updateInput(e)}
                                    name={'street'}
                                    type={'text'} placeholder={'Street'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.city}
                                    onChange={e => updateInput(e)}
                                    name={'city'}
                                    type={'text'} placeholder={'City'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.state}
                                    onChange={e => updateInput(e)}
                                    name={'state'}
                                    type={'text'} placeholder={'State'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.country}
                                    onChange={e => updateInput(e)}
                                    name={'country'}
                                    type={'text'} placeholder={'Country'}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={address.pinCode}
                                    onChange={e => updateInput(e)}
                                    name={'pinCode'}
                                    type={'number'} placeholder={'PinCode'}></Form.Control>
                            </Form.Group>
                            <Button variant={'success'} type={'submit'}>Create</Button>
                            <Link to={'/users/profile'} className="btn btn-dark ms-2">Cancel</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default AddShippingAddress;