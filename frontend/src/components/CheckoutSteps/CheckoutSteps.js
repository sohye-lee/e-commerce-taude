import React from 'react';
import './CheckoutSteps.css';

export default function CheckoutSteps(props) {
    return (
        <div className="checkout__steps row">
            <div className={props.step1? 'active': ''}><h3>Login</h3></div>
            <div className={props.step2? 'active': ''}><h3>Shipping</h3></div>
            <div className={props.step3? 'active': ''}><h3>Payment</h3></div>
            <div className={props.step4? 'active': ''}><h3>Proceed to Order</h3></div>
        </div>
    )
};