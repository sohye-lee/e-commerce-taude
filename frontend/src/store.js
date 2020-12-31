import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { 
  orderCreateReducer, 
  orderDetailsReducer, 
  orderHistoryReducer, 
  orderPayReducer
} from './reducers/orderReducers';
import {
  productCreateReducer,
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers';
import { 
  userGetProfileReducer,
  userRegisterReducer, 
  userSinginReducer, 
  userUpdateProfileReducer
} from './reducers/userReducers'

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    cart: cartReducer,
    userSignin: userSinginReducer,
    userRegister: userRegisterReducer,
    userProfile: userGetProfileReducer,
    userUpdatedProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderHistory: orderHistoryReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
