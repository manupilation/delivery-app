import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

/* Children */
import { NavBar } from '../components/atoms';
import { Header } from '../components/molecules';

import {
  Account,
  Checkout,
  Login,
  OrderDetails,
  Orders,
  Products,
  Register,
  Splash,
  LostPass,
  ResetPass,
} from '../components/pages';

function AppRoutes() {
  return (
    <Router>
      {/* Header */}
      <Header />

      <Routes>
        <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
        <Route path="/seller/orders" element={ <Orders /> } />
        <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route path="/customer/orders" element={ <Orders /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/account" element={ <Account /> } />
        <Route path="/lostPassword" element={ <LostPass /> } />
        <Route path="/resetPass/:token" element={ <ResetPass /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <Splash /> } />
      </Routes>

      {/* Mobile "Icon Bar" Menu */}
      <NavBar iconbar />
    </Router>
  );
}

export default AppRoutes;
