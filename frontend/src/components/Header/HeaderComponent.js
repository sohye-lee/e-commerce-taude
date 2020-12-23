import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

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
                    <Link to="/login" className="header__login"><i className="fa fa-unlock-alt" style={{marginRight: '12px'}}/> login</Link>
                </div>
            </div>
        </div>
    )
};

export default Header;

