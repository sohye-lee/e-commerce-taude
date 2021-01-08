import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './SigninScreen.css';

export default function SigninScreen(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };
    
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div className="form__container">
            <div className="form__content">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="form__title">Welcome Back</h1>
                    {loading && <LoadingBox />}
                    {error && <MessageBox variant="error">{error}</MessageBox>}
                    <div className="row">
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="EMAIL" 
                            value={email}
                            required 
                            onChange={e=> setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="row">
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="PASSWORD" 
                            value={password}
                            required 
                            onChange={e=> setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn">Sign In</button>
                    <div>
                            New customer? {' '}
                            <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}