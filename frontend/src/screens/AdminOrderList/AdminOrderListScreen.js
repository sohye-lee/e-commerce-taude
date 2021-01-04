import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { ORDER_DELETE_RESET } from '../../constants/orderConstants';
import './AdminOrderList.css';

export default function AdminOrderListScreen(props) {
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders());	  
      }, [dispatch, successDelete]);

    const handleDelete = (order) => {
        if (window.confirm(`Are you sure you wish to delete the order ${order._id}?`)) {
            dispatch(deleteOrder(order._id));
        }
    };

    return (
        <div className="admin__container container">
            <div className="admin__content">
                <div className="admin__header row">
                    <h1 className="admin__title">Orders</h1>
                </div>
                {loadingDelete && <LoadingBox />}
                {errorDelete && <MessageBox variant="error">{errorDelete}</MessageBox>}
                {loading? <LoadingBox/>:
                error? <MessageBox variant="error">{error}</MessageBox>
                : 
                (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CUSTOMER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.createdAt}</td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td>{order.isPaid ? ('Paid at '+order.paidAt.substring(0,10)): 'NO'}</td>
                                    <td>{order.isDelivered ? ('Delivered at '+order.deliveredAt.substring(0,10)): 'NO'}</td>
                                    <td>
                                        <div className="table__btn">
                                            <button 
                                                type="button"
                                                className="btn small"
                                                onClick={() => props.history.push(`/order/${order._id}`)}
                                            >
                                                DETAILS
                                            </button>
                                            <button 
                                                type="button"
                                                className="btn small"
                                                onClick={() => handleDelete(order)}
                                            >
                                                DELETE
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
