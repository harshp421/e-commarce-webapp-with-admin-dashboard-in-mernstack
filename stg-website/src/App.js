import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { PrivateRoute } from "./routing/PrivateRoute";
import { OpenRoute } from "./routing/OpenRoute";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import axios from 'axios'
import setupAxios from "./util/axiosConfig";
import { useSelector} from 'react-redux'
function App() {
  const user=useSelector(state=>state.auth.user);
  setupAxios(axios,user)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="cart" element={   <PrivateRoute>  <Cart /> </PrivateRoute>  } />
            <Route path="my-orders" element={   <PrivateRoute>  <Orders /> </PrivateRoute>  } />
            <Route path="my-profile" element={   <PrivateRoute>  <Profile /> </PrivateRoute>  } />
            <Route path="checkout" element={ <PrivateRoute> <Checkout /></PrivateRoute>} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<PrivateRoute>  <Wishlist /></PrivateRoute>} />
            <Route path="login" element={<OpenRoute> <Login /></OpenRoute>} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<OpenRoute><Signup /></OpenRoute> } />
            <Route path="reset-password/:token" element={<Resetpassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
