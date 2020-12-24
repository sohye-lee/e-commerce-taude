import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import './ShippingAddressScreen.css';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [ fullname, setFullname ] = useState(shippingAddress.fullname || '');
    const [ street, setStreet ] = useState(shippingAddress.street || '');
    const [ city, setCity ] = useState(shippingAddress.city || '');
    const [ stateName, setStateName ] = useState(shippingAddress.stateName || '');
    const [ zip, setZip ] = useState(shippingAddress.zip || '');
    const [ country, setCountry ] = useState(shippingAddress.country || '');

    if (!userInfo) {
        props.history.push('/signin');
    };

    const dispatch = useDispatch();
        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(saveShippingAddress({ fullname, street, city, stateName, zip, country }));
            props.history.push('/payment');
    };

    return (
        <div className="shipping__container">
            <div className="shipping__content">
                <CheckoutSteps step1 step2 />
                <form className="shipping__form form" onSubmit={handleSubmit}>
                    <h1 className="form__title">Shipping Information</h1>
                    <div className="row">
                        <input 
                            type="text" 
                            id="fullname" 
                            placeholder="Full Name" 
                            required 
                            value={fullname}
                            onChange={(e)=> setFullname(e.target.value)} 
                        />
                    </div>
                    <div className="row">
                        <input 
                            type="text" 
                            id="street" 
                            placeholder="street" 
                            value={street}
                            required 
                            onChange={e=> setStreet(e.target.value)} 
                        />
                    </div>
                    <div className="row">
                        <input 
                            type="text" 
                            id="city" 
                            placeholder="city" 
                            value={city}
                            required 
                            onChange={e=> setCity(e.target.value)} 
                        />
                    </div>
                    <div className="row">
                        <input 
                            type="text" 
                            id="state" 
                            placeholder="state" 
                            value={stateName}
                            required 
                            onChange={e=> setStateName(e.target.value)} 
                        />
                    </div>
                    <div className="row">
                        <input 
                            type="text" 
                            id="zip" 
                            placeholder="zip" 
                            value={zip}
                            required 
                            onChange={e=> setZip(e.target.value)} 
                        />
                    </div>
                    <div className="row">
                        <input 
                            type="text" 
                            id="country" 
                            placeholder="country" 
                            value={country}
                            required 
                            onChange={e=> setCountry(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn">Continue</button>
                </form>
            </div>
        </div>
    )
};
