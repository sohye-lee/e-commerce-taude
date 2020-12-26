import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import './OrderScreen.css';

export default function OrderScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


    const cart = useSelector(state => state.cart);
    const { shippingAddress, cartItems, paymentMethod } = cart;
    
    if (!shippingAddress) {
        props.history.push('/shipping');
    }
    if (!userInfo) {
        props.history.push('/signin');
    }

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cartItems.reduce((a,b) => a + b.qty*b.price, 0));
    cart.shippingFee = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10.90);
    cart.tax = toPrice(cart.itemsPrice * 0.09);

    const handlePlaceOrder = () => {
        
    }

    return (
        <div className="order__container">
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="order__content row top">
                <div className="order__left">
                    <div className="order__box">
                        <h3 className="order__title">Shipping</h3>
                        <h4 className="order__detail"><span className="bold">Name / </span> {shippingAddress.fullname}</h4>
                        <h4 className="order__detail">
                            <span className="bold">Address / </span>
                            {`${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.stateName} ${shippingAddress.zip}, ${shippingAddress.country}`}
                        </h4>
                    </div>
                    <div className="order__box">
                        <h3 className="order__title">Payment</h3>
                        <h4 className="order__detail"><span className="bold">Paid by </span>{paymentMethod}</h4>
                    </div>
                    <div className="order__box">
                        <h3 className="order__title">Items</h3>
                        <div className="order__item__header order__item">
                            <div className="item__img">ITEM</div>
                            <div className="item__name">NAME</div>
                            <div className="item__price">PRICE</div>
                            <div className="item__qty">QTY</div>
                            <div className="item__subtotal">SUBTOTAL</div>
                        </div>
                        {cartItems.length > 0
                        ? cartItems.map(item => (
                                <div className="order__item" key={item._id}>
                                    <Link to={`/product/${item.product}`}><img className="item__img" src={item.image} alt={item.name}/></Link>
                                    <h4 className="order__detail item__name"><Link to={`/product/${item.product}`}>{item.name}</Link></h4>
                                    <h4 className="order__detail item__price">${item.price}</h4>
                                    <h4 className="order__detail item__qty">{item.qty}</h4>
                                    <h4 className="order__detail item__subtotal">${item.qty * item.price}</h4>
                                </div>
                        ))
                        : <div></div>}
                    </div>
                </div>
                <div className="order__right">
                    <div className="order__box">
                        <h3 className="order__title">Order summary</h3>
                        <div className="order__detail row">
                            <span>Items</span>
                            <span>${cart.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="order__detail row">
                            <span>Shipping</span>
                            <span>${cart.shippingFee.toFixed(2)}</span>
                        </div>
                        <div className="order__detail row">
                            <span>Tax</span>
                            <span>${cart.tax.toFixed(2)}</span>
                        </div>
                        <div className="order__detail row bold">
                            <span>Total</span>
                            <span>${(cart.itemsPrice + cart.shippingFee + cart.tax).toFixed(2)}</span>
                        </div>
                        <button className="btn" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
