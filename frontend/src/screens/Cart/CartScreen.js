import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import MessageBox from '../../components/MessageBox';
import './CartScreen.css'

const Cart = (props) => {

    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        : 1;

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const handleCheckout = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className="cart__container container">
            <Link to="/"><div className="screen__goBack"><span><i className="fa fa-angle-left" /> BACK TO MAIN</span></div></Link>
            <div className="cart__content row top">
                <div className="cart__items">
                    <h2>Items In Your Cart</h2>
                    {cartItems.length > 0 
                        ? cartItems.map(item => (
                            <div className="cart__item" key={cartItems.indexOf(item)}>
                                <img className="cart__item__img" src={item.image} alt={item.name} />
                                <h4 style={{flexBasis: '45%'}}>{item.name}</h4>
                                <select 
                                    value={item.qty} 
                                    name="qty" 
                                    style={{flexBasis: '7%', height: '40%', minWidth: '50px', paddingLeft: '7px'}}
                                    onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                                >
                                    {
                                        [...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x+1} value={x+1} >{x+1}</option>
                                            ))
                                        }
                                </select>
                                <h4 style={{flexBasis: '15%',  textAlign: 'right', margin: '7px', minWidth: '60px'}}>${(item.price).toFixed(2)}</h4>
                                <button 
                                    type="button"
                                    className="btn small" 
                                    style={{flexBasis: '8%'}}
                                    onClick={() => handleRemoveItem(item.product)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                        : (<MessageBox> Your Cart Is Empty. <Link to="/" style={{color:'var(--White)', padding: '3px 5px', backgroundColor: 'var(--Black)'}}> Click To Go Back To Shopping</Link></MessageBox>)}
                    
                </div>
                <div className="cart__action">
                    <h2>Subtotal ({cartItems.reduce((a, b) => a + b.qty, 0)} items) : $ {cartItems.reduce((a,b) => a + b.price * b.qty, 0).toFixed(2)}</h2>
                    <button 
                        type="button" 
                        className="btn" 
                        onClick={() => handleCheckout()}
                        disabled={cartItems.length === 0}
                    >
                        Proceed To Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;