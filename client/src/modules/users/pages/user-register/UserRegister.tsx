import React, {useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {UserView} from "../../models/UserView";
import * as userActions from "../../../../redux/users/users.actions";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as userReducer from "../../../../redux/users/user.reducer";
import {useSelector} from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";

const UserRegister: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState<boolean>(false);


    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    const {loading} = userState;

    const [user, setUser] = useState<UserView>({
        username: "",
        email: "",
        password: ""
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | any>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement | any>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(userActions.registerUserAction({user: user})).then((response: any) => {
                if (response && !response.error) {
                    navigate("/users/login");
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
            <LayoutHeading heading={'Register Here'} icon={'bi-person-add'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={user.username}
                                    pattern={"[a-zA-Z0-9]{4,10}"}
                                    name={'username'}
                                    onChange={e => updateInput(e)}
                                    type="text" placeholder="Username"/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid username.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    value={user.email}
                                    name={'email'}
                                    onChange={e => updateInput(e)}
                                    type="email" placeholder="Email"/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\\[\\]|\\\\:;\"'<>,.?/_₹]).{6,15}"}
                                    value={user.password}
                                    name={'password'}
                                    onChange={e => updateInput(e)}
                                    type="password" placeholder="Password"/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Register
                            </Button>
                            <Link to={'/'} className="btn btn-dark ms-2">Cancel</Link>
                        </Form>
                        <small className="text-success">
                            Already have an account? <Link to={'/users/login'}
                                                           className="fw-bold text-primary text-decoration-none">Login</Link>
                        </small>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default UserRegister;