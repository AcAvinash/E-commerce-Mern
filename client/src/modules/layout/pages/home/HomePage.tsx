import React from 'react';
import {Link} from "react-router-dom";
import * as userReducer from "../../../../redux/users/user.reducer";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {TokenUtil} from "../../../../util/TokenUtil";

const HomePage: React.FC = () => {


    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    const {isAuthenticated} = userState;


    return (
        <>
            <div className="landing-page">
                <div className="wrapper">
                    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                        <p id={'header-text'} className="display-1 text-success">React E-Commerce 2023</p>
                        <div>
                            {
                                TokenUtil.isLoggedIn() && isAuthenticated ?
                                    <Link to={'/products/fashion'} className="btn btn-warning">
                                        <i className="bi bi-phone"></i> Products</Link> :
                                    <Link to={'/users/login'} className="btn btn-success ms-2">
                                        <i className="bi bi-lock"></i> Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default HomePage;