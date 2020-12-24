import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';

import './Header.css';

const Header = () => {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(signout());
    }

    return (
        <div className="header__container">
            <div className="header__content row">
                <div className="header__left">
                    <Link to="/" className="header__brand"><h2 className="logo">TAUDE</h2></Link>
                </div>
                <div className="header__right">
                    <Link to="/cart" className="header__cart">
                        <i className="fa fa-shopping-bag" style={{marginRight: '12px'}}/> 
                         cart 
                        {
                            cartItems.length > 0 
                            ? (<span className="cart__qty" >{cartItems.length}</span>)
                            : (<span></span>)
                        }
                    </Link>
                    {
                        userInfo
                        ? (
                        <div className="header__dropdown">
                            <Link to="#" className="header__login" ><i className="fa fa-unlock-alt" style={{marginRight: '8px'}}/> {userInfo.name} <i className="fa fa-caret-down"/></Link>
                            <ul className="dropdown-content" >
                                <Link to="#signout" onClick={handleSignOut}>
                                    logout
                                </Link>
                            </ul>
                        </div>
                        )
                        :(<Link to="/signin" className="header__login"><i className="fa fa-lock" style={{marginRight: '8px'}}/> login</Link>)
                    }
                    
                </div>
            </div>
        </div>
    )
};

export default Header;

