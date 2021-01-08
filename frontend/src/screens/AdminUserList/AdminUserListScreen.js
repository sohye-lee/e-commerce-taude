import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteUser, listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function AdminUserListScreen() {
    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;
    const userDelete = useSelector(state => state.userDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch, successDelete]);

    const handleDelete = (user) => {
        if (window.confirm(`Do you wish to delete user "${user.name}" ?`)) {
            dispatch(deleteUser(user._id));
        }
    };

    return (
        <div className="admin__container container">
        <Link to="/dashboard"><div className="screen__goBack"><span><i className="fa fa-angle-left" /> BACK TO DASHBOARD</span></div></Link>
        <div className="admin__content">
            <div className="admin__header row">
                <h1 className="order__title">Users</h1>
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
                            <th className="table__id">ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th># ORDERS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&users.map((user) => (
                            <tr key={user._id}>
                                <td className="table__id">{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>orders</td>
                                <td>
                                    <div className="table__btn">
                                        <button type="button" className="btn small">
                                            <a className="btn__wrap" href={"mailto:"+user.email} style={{color:'var(--White)'}}>
                                                CONTACT
                                            </a>
                                        </button>
                                        <button 
                                            type="button"
                                            className="btn small"
                                            onClick={() => handleDelete(user)}
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
