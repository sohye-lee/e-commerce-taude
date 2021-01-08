import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders } from '../../actions/orderActions';
import { listProducts } from '../../actions/productActions';
import { getReviews } from '../../actions/reviewActions';
import { listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const productList = useSelector(state => state.productList);
    const { loading: loadingProducts, error: errorProducts, products } = productList;
    const orderList = useSelector(state => state.orderList);
    const { loading: loadingOrders, error: errorOrders, orders } = orderList;
    const userList = useSelector(state => state.userList);
    const { loading: loadingUsers, error: errorUsers, users } = userList;
    const reviewList = useSelector(state => state.reviewList);
    const { reviews } = reviewList;

    const todayMonth = new Date().toISOString().substring(0,7);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listUsers());
        dispatch(listOrders());
        dispatch(listProducts());
        dispatch(getReviews());
    },[dispatch]);

    return (
        <div className="info__container container">
            <div className="admin__content">
                <div className="admin__header">
                    <h1 className="admin__title">Dashboard</h1>
                </div>
                <div className="dashboard__content">
                    <div className="dashboard__box">
                        <div className="box__content">
                            <h1 className="box__title">Customers</h1>
                            {loadingUsers ? (<LoadingBox />)
                            : errorUsers ? (<MessageBox variant="error">{errorUsers}</MessageBox>)
                            : (
                                <>
                                    <div className="box__item row">
                                        <h3>TOTAL CUSTOMERS</h3>
                                        <h3>{users? users.filter(users => !users.isAdmin).length : 0}</h3>
                                    </div>
                                    <div className="box__item row">
                                        <h3>NEW CUSTOMERS</h3>
                                        <h3>{users? users.filter(user => user.updatedAt.substring(0,7) === todayMonth).length: 0}</h3>
                                    </div>
                                    <div className="box__item row">
                                        <h3>TOTAL REVIEWS</h3>
                                        <h3>{reviews? reviews.length : 0}</h3> 
                                    </div>
                                    <div className="box__item row">
                                        <h3>AVERAGE RATING</h3>
                                        <h3>{reviews? ((reviews.reduce((a,b) => a + b.rating, 0))/reviews.length).toFixed(1): 0} / 5</h3> 
                                    </div>
                                </>
                            )}
                            
                        </div>
                        <Link to="userlist"><button className="btn">See More</button></Link>
                    </div>
                    <div className="dashboard__box">
                        <div className="box__content">
                            <h1 className="box__title">Orders</h1>
                            {loadingOrders ? (<LoadingBox />)
                            : errorOrders ? (<MessageBox variant="error">{errorOrders}</MessageBox>)
                            : (
                                <>
                                    <div className="box__item row">
                                        <h3>TOTAL ORDERS</h3>
                                        <h3>{orders? orders.length : 0}</h3>
                                    </div>
                                    <div className="box__item row">
                                        <h3>TOTAL SELLING</h3>
                                        <h3>${orders? orders.reduce((a,b)=> a + b.total, 0) : 0}</h3>
                                    </div>
                                    <div className="box__item row">
                                        <h3>ORDER PAID</h3>
                                        <h3>{orders? orders.filter(order => order.isPaid).length : 0}</h3> 
                                    </div>
                                    <div className="box__item row">
                                        <h3>ITEMS SOLD</h3>
                                        <h3>{orders? orders.reduce((a,b) => a + b.orderItems.length, 0): 0}</h3> 
                                    </div>
                                </>
                            )}
                        </div>
                        <Link to="orderlist"><button className="btn">See More</button></Link>
                    </div>
                    <div className="dashboard__box">
                        <div className="box__content">
                            <h1 className="box__title">Products</h1>
                            {loadingProducts ? (<LoadingBox />)
                            : errorProducts ? (<MessageBox variant="error">{errorProducts}</MessageBox>)
                            : (
                                <>
                                    <div className="box__item row">
                                        <h3>TOTAL PRODUCTS</h3>
                                        <h3>{products? products.length : 0}</h3>
                                    </div>
                                    <div className="box__item row">
                                        <h3>QTY IN STOCK</h3>
                                        <h3>{products? products.reduce((a,b)=> a + b.countInStock, 0) : 0}</h3>
                                    </div>
                                    <div className="box__item row">
                                        <h3>TOTAL VALUE</h3>
                                        <h3>${products? products.reduce((a,b)=> a + b.price, 0).toFixed(2) : 0}</h3> 
                                    </div>
                                    <div className="box__item row">
                                        <h3>NEW PRODUCTS</h3>
                                        <h3>{products? products.filter(product => product.updatedAt.substring(0,7) === todayMonth).length: 0}</h3> 
                                    </div>
                                </>
                            )}
                        </div>
                        <Link to="productlist"><button className="btn">See More</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
};
