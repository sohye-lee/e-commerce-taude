import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { 
  orderCreateReducer, 
  orderDeleteReducer, 
  orderDeliverReducer, 
  orderDetailsReducer, 
  orderHistoryReducer, 
  orderListReducer, 
  orderPayReducer
} from './reducers/orderReducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import { reviewCreateReducer, reviewDeleteReducer, reviewEditReducer, reviewListReducer } from './reducers/reviewReducers';
import { 
  userDeleteReducer,
  userGetProfileReducer,
  userListReducer,
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
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    userSignin: userSinginReducer,
    userRegister: userRegisterReducer,
    userProfile: userGetProfileReducer,
    userUpdatedProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderHistory: orderHistoryReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    reviewList: reviewListReducer,
    reviewCreate: reviewCreateReducer,
    reviewEdit: reviewEditReducer,
    reviewDelete: reviewDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
