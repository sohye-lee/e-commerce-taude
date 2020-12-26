import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import './PaymentScreen.css';

export default function PaymentScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!userInfo) {
        props.history.push('/signin');
    } else if (!shippingAddress.street) {
        props.history.push('/shipping');
    }

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div className="payment__container">
            <div className="payment__content">
                <CheckoutSteps step1 step2 step3 />
                <form onSubmit={handleSubmit} className="payment__form form">
                    <h1 className="form__title">Payment Method</h1>
                    <div className="payment__radios">
                        <div className="payment__method">
                            <input 
                                type="radio" 
                                id="paypal" 
                                name="payment" 
                                value="PayPal" 
                                required 
                                checked 
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                        <div className="payment__method">
                            <input 
                                type="radio" 
                                id="stripe" 
                                name="payment" 
                                value="Stripe" 
                                required 
                                onChange={e => setPaymentMethod(e.target.value)} 
                            />
                            <label htmlFor="stripe">Stripe</label>
                        </div>
                    </div>
                    <button type="submit" className="btn">Continue</button>
                </form>
            </div>
        </div>
    )
};
