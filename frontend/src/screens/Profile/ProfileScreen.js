import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGetProfile, userProfileUpdate } from '../../actions/userActions.js';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { USER_UPDATE_RESET } from '../../constants/userConstants.js';
import './Profile.css';

export default function UserScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userProfile = useSelector(state => state.userProfile);
    const { loading, error, user } = userProfile;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userUpdatedProfile = useSelector(state => state.userUpdatedProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdatedProfile;

    const dispatch = useDispatch();
    useEffect(() => {
        if(!user) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(userGetProfile(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
            
        }
    }, [dispatch, userInfo._id, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Password not matched. Please check new password');
        } else {
            dispatch(userProfileUpdate({ userId: user._id, name, email, password}))
        }

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
                        {loadingUpdate && <LoadingBox />}
                        {errorUpdate && <MessageBox variant="error">{error}</MessageBox>}
                        {successUpdate && <MessageBox variant="success">Profile Updated Successfully!</MessageBox>}
                        <div className="row">
                            <input 
                                type="text" 
                                id="name" 
                                placeholder="NAME" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="EMAIL" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="PASSWORD"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                placeholder="CONFIRM PASSWORD" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn" onClick={handleSubmit}>UPDATE</button>
                    </>
                    )}
                </form>
            </div>
        </div>
    )
};
