import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/HeaderComponent';
import Footer from './components/Footer/FooterComponent';
import HomeScreen from './screens/Home/HomeScreen';
import ProductScreen from './screens/Product/ProductScreen';
import CartScreen from './screens/Cart/CartScreen';
import SigninScreen from './screens/Signin/SigninScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddress/ShippingAddressScreen';
import PaymentScreen from './screens/Payment/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrder/PlaceOrderScreen';
import OrderScreen from "./screens/Order/OrderScreen";
import OrderHistoryScreen from './screens/OrderHistory/OrderHistoryScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';

function App() {

  return (
    <BrowserRouter> 
      <Header />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/product/:id" component={ProductScreen} exact />
      <Route path="/signin" component={SigninScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/shipping" component={ShippingAddressScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/orderhistory" component={OrderHistoryScreen} />
      <Route path="/" component={HomeScreen} exact />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
