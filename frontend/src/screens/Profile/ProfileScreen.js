import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGetProfile } from '../../actions/userActions.js';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './Profile.css';

export default function UserScreen(props) {
    const userProfile = useSelector(state => state.userProfile);
    const { loading, error, user } = userProfile;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userGetProfile(userInfo._id));
    }, [dispatch, userInfo._id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="form__container">
            <div className="form__content">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="form__title">User Profile</h1>
                    {loading ?  (<LoadingBox />) 
                    : error? (<MessageBox variant="error">{error}</MessageBox>)
                    :(
                    <>
                        <div className="row">
                            <input 
                                type="text" 
                                id="name" 
                                placeholder="NAME" 
                                value={user.name}
                                required 
                            />
                        </div>
                        <div className="row">
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="EMAIL" 
                                value={user.email}
                                required 
                            />
                        </div>
                        <div className="row">
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="PASSWORD"
                                required 
                            />
                        </div>
                        <div className="row">
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                placeholder="CONFIRM PASSWORD" 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn">UPDATE</button>
                    </>
                    )}
                </form>
            </div>
        </div>
    )
};
