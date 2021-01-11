import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { deliverOrder, detailsOrder, payOrder } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './OrderScreen.css';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../constants/orderConstants';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { 
        loading: loadingDeliver, 
        error: errorDeliver, 
        success: successDeliver, 
    } = orderDeliver;

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };
    
    const handleDeliver = () => {
        dispatch(deliverOrder(order._id));
    };

    useEffect(() => {
        const addPayPalScript = async() => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if(
            !order || 
            successPay || 
            successDeliver || 
            (order && order._id !== orderId)
        ) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderId, order, sdkReady, successPay, successDeliver]);

   

    return  loading? (<LoadingBox></LoadingBox>)
        : error? (<MessageBox variant="error">{error}</MessageBox>)
        : (
        <div className="order__container container">
            <Link to="/"><div className="screen__goBack"><span><i className="fa fa-angle-left" /> BACK TO MAIN</span></div></Link>
            <h1 className="order__details__title"> Order {order._id}</h1>
            <div className="order__content row top">
                <div className="order__left">
                    <div className="order__box">
                        <h3 className="order__title">Shipping</h3>
                        <h4 className="order__detail"><span className="bold">Name / </span> {order.shippingAddress.fullname}</h4>
                        <h4 className="order__detail">
                            <span className="bold">Address / </span>
                            {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.stateName} ${order.shippingAddress.zip}, ${order.shippingAddress.country}`}
                        </h4>
                        {order.isDelivered? (<MessageBox variant="info">Delivered at {order.deliveredAt}</MessageBox>) : (<MessageBox variant="error">Not Delivered</MessageBox>)}
                    </div>
                    <div className="order__box">
                        <h3 className="order__title">Payment</h3>
                        <h4 className="order__detail"><span className="bold">Paid by </span>{order.paymentMethod}</h4>
                        {order.isPaid? (<MessageBox variant="info">Paid at {order.paidAt}</MessageBox>) : (<MessageBox variant="error">Not Paid</MessageBox>)}

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
                        {order.orderItems.length > 0
                        ? order.orderItems.map(item => (
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
                            <span>${order.itemsPrice}</span>
                        </div>
                        <div className="order__detail row">
                            <span>Shipping</span>
                            <span>${order.shippingFee}</span>
                        </div>
                        <div className="order__detail row">
                            <span>Tax</span>
                            <span>${order.tax}</span>
                        </div>
                        <div className="order__detail row bold">
                            <span>Total</span>
                            <span>${order.total}</span>
                        </div>
                        {
                            !order.isPaid && (
                                <div>
                                    {!sdkReady ? (<LoadingBox />):
                                    (<>
                                        {errorPay && (
                                            <MessageBox variant="error">{errorPay}</MessageBox>
                                        )}
                                        {loadingPay && <LoadingBox />}
                                        <PayPalButton amount={order.total} onSuccess={handleSuccessPayment} />
                                    </>)
                                    }
                                </div>
                            )
                        }
                        {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <div>
                                {loadingDeliver && <LoadingBox />}
                                {errorDeliver && (
                                    <MessageBox variant="error">{errorDeliver}</MessageBox>
                                )}
                                <button type="button" onClick={handleDeliver} className="btn">Deliver Order</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
             
        </div>
    )
};
