import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import * as userReducer from "../../../../redux/users/user.reducer";
import * as cartReducer from "../../../../redux/cart/cart.reducer";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {TokenUtil} from "../../../../util/TokenUtil";

const MainNavBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();


    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });


    const cartReduxState: cartReducer.InitialState = useSelector((state: RootState) => {
        return state[cartReducer.cartFeatureKey];
    });

    const {user, isAuthenticated} = userState;

    const {cartProduct} = cartReduxState;

    const navigateTo = (path: string): void => {
        navigate(path);
    };

    const clickLogOut = () => {
        dispatch({
            type: `${userReducer.userLogOutAction}`
        });
        navigateTo("/");
    };

    return (
        <>
            <Navbar bg="success" expand="sm" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Link to={'/'} className="text-white text-decoration-none">React E-Commerce</Link>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {
                            TokenUtil.isLoggedIn() && isAuthenticated && user && Object.keys(user).length > 0 &&
                            <>
                                <Nav className="">
                                    <Link to={'/products/fashion'} className="nav-link">Fashion</Link>
                                </Nav>
                                <Nav className="">
                                    <Link to={'/products/electronics'} className="nav-link">Electronics</Link>
                                </Nav>
                                <Nav className="">
                                    <Link to={'/products/household'} className="nav-link">Household</Link>
                                </Nav>
                                {
                                    TokenUtil.isLoggedIn() && user.isAdmin &&
                                    <Nav>
                                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                                            <NavDropdown.Item onClick={() => navigate("/categories/add")}>Add
                                                Categories</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => navigate("/products/upload")}>Upload
                                                Products</NavDropdown.Item>
                                            {
                                                user.isSuperAdmin &&
                                                <>
                                                    <NavDropdown.Divider/>
                                                    <NavDropdown.Item onClick={() => navigate("/products/admin")}>Manage
                                                        Products</NavDropdown.Item>
                                                    <NavDropdown.Item
                                                        onClick={() => navigate("/orders/admin")}>Manage
                                                        Orders</NavDropdown.Item>
                                                </>
                                            }
                                        </NavDropdown>
                                    </Nav>
                                }
                            </>
                        }
                        <div className="d-flex ms-auto">
                            {
                                TokenUtil.isLoggedIn() && isAuthenticated && user && Object.keys(user).length > 0 &&
                                <>
                                    <Nav className="">
                                        <Link to={'/cart/list'} className="nav-link pe-3">
                                            <i className="bi bi-cart-fill"></i>
                                            <span
                                                className="cart-count">{cartProduct && cartProduct.products ? cartProduct.products.length : 0}</span>
                                        </Link>
                                    </Nav>
                                    <Nav className="">
                                        <Link to={'/products/fashion'} className="nav-link">
                                            <img src={user.imageUrl} alt="" className="rounded-circle"
                                                 width={25}
                                                 height={25}/>
                                        </Link>
                                    </Nav>
                                    <Nav>
                                        <NavDropdown title={user.username} id="basic-nav-dropdown">
                                            <NavDropdown.Item
                                                onClick={() => navigate("/users/profile")}>Profile</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => navigate("/users/change-password")}>Change
                                                Password</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => navigate("/users/orders/me")}>Your
                                                Orders</NavDropdown.Item>
                                            <NavDropdown.Divider/>
                                            <NavDropdown.Item
                                                onClick={clickLogOut}>
                                                <i className="bi bi-power"></i> LogOut</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};
export default MainNavBar;