import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/index';

// Page imports
import Home from './page/Home';
import About from './page/About';
import Contact from './page/Contact';
import Menu from './page/Menu';
import Login from './page/Login';
import Newproduct from './page/Newproduct';
import Signup from './page/Signup';
import Cart from './page/Cart';
import Success from './page/Success';
import Payment from './component/payment';
import OrderSuccess from './page/OderSuccess';
import Orders from './page/Orders'; // ✅ Import Orders page
import OrderDetails from './page/OrderDetails'; // ✅ Import OrderDetails page

// Define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="menu" element={<Menu />} />
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="newproduct" element={<Newproduct />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success />} />
      <Route path="payment" element={<Payment />} />
      <Route path="order-success/:orderId" element={<OrderSuccess />} />
      <Route path="orders" element={<Orders />} />                     {/* ✅ Orders Page */}
      <Route path="order/:orderId" element={<OrderDetails />} />      {/* ✅ Order Details Page */}
      
      {/* Stripe fallback load */}
      <Route
        path="stripe-payment"
        element={React.createElement(require('./page/StripePayment').default)}
      />
    </Route>
  )
);

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
