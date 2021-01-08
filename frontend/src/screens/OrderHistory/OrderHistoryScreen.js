import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderHistory } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './OrderHistoryScreen.css';

export default function OrderHistoryScreen(props) {
    const orderHistory = useSelector(state => state.orderHistory);
    const { loading, error, orders } = orderHistory;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderHistory());
    }, [dispatch])

    return (
        <div className="order__container container">
            <div className="order__content">
                <h1 className="order__title">Order History</h1>
                {loading? <LoadingBox/>:
                error? <MessageBox variant="error">{error}</MessageBox>
                : 
                (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className="table__id">ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th className="table__paid">PAID</th>
                                <th className="table__delivered">DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="table__id">{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.total}</td>
                                    <td>{order.isPaid? order.paidAt.substring(0,10):'NO'}</td>
                                    <td>{order.isDelivered? order.deliveredAt.substring(0,10):'NO'}</td>
                                    <td>
                                        <div className="table__btn">
                                            <button 
                                                type="button"
                                                className="btn smallbtn"
                                                onClick={() => props.history.push(`/order/${order._id}`)}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
};
