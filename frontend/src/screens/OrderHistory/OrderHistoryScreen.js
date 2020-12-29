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
        <div className="order__container">
            <div className="order__content">
                <h1 className="order__title">Order History</h1>
                {loading? <LoadingBox/>:
                error? <MessageBox variant="error">{error}</MessageBox>
                : 
                (
                    <table className='order__table'>
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.total.toFixed(2)}</td>
                                    <td>{order.isPaid? order.paidAt.substring(0,10):'NO'}</td>
                                    <td>{order.isDelivered? order.deliveredAt.substring(0,10):'NO'}</td>
                                    <td className="table__btn">
                                        <button 
                                            type="button"
                                            className="order__smallbtn btn"
                                            onClick={() => props.history.push(`/order/${order._id}`)}
                                        >
                                            Details
                                        </button>
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
