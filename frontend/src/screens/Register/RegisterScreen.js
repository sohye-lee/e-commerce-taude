import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import './RegisterScreen.css';

export default function RegisterScreen(props) {

    
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password does not match. Please verify and try again.')
        } else {
            dispatch(register(name, email, password));
        }
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
                    <h1 className="form__title">Create Account</h1>
                    {loading && <LoadingBox />}
                    {error && <MessageBox variant="error">{error}</MessageBox>}
                    <div className="row">
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="NAME" 
                            value={name}
                            required 
                            onChange={e=> setName(e.target.value)} 
                        />
                    </div>
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
                    <div className="row">
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            placeholder="CONFIRM PASSWORD" 
                            value={confirmPassword}
                            required 
                            onChange={e=> setConfirmPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn">Register</button>
                    <div>
                            Already have an account? {' '}
                            <Link to={`/signin?redirect=${redirect}`}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}