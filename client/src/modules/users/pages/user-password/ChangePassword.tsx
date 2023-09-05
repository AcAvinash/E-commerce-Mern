import React, {useState} from 'react';
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/layout-heading/LayoutHeading";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {Link, useNavigate} from "react-router-dom";
import * as userReducer from "../../../../redux/users/user.reducer";
import {useSelector} from "react-redux";
import {UserView} from "../../models/UserView";
import * as userActions from "../../../../redux/users/users.actions";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {ToastUtil} from "../../../../util/ToastUtil";

interface IState {
    password: string;
    confirmPassword: string;
}

const ChangePassword: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState<boolean>(false);

    // get data from redux store
    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    const {loading} = userState;

    const [user, setUser] = useState<IState>({
        password: "",
        confirmPassword: ""
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
            if (user.password === user.confirmPassword) {
                dispatch(userActions.changePasswordAction({password: user.password})).then((response: any) => {
                    /*if (response && !response.error) {
                        dispatch({
                            type: `${userReducer.userLogOutAction}`
                        });
                        navigate("/");
                    }*/
                });
            } else {
                ToastUtil.displayErrorToast("Both the passwords are not matched!")
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
            <MainNavBar/>
            <LayoutHeading heading={'Change Password'} icon={'bi-eye-fill'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\\[\\]|\\\\:;\"'<>,.?/_₹]).{6,15}"}
                                    value={user.password}
                                    name={'password'}
                                    onChange={e => updateInput(e)}
                                    type="password" placeholder="New Password"/>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    required
                                    pattern={"(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\\[\\]|\\\\:;\"'<>,.?/_₹]).{6,15}"}
                                    value={user.confirmPassword}
                                    name={'confirmPassword'}
                                    onChange={e => updateInput(e)}
                                    type="password" placeholder="Confirm Password"/>
                                <Form.Control.Feedback type="invalid">
                                    Both the passwords should match
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Change Password
                            </Button>
                            <Link to={'/'} className="btn btn-dark ms-2">Cancel</Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default ChangePassword;