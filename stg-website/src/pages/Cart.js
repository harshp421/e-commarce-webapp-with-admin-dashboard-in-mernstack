import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../features/user/userSlice";
import SingleCart from "../components/SingleCart";

const Cart = () => {

  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
  const dispatch = useDispatch();
  const userCartstate = useSelector((state) => state?.auth?.cartProducts);
  const [totalamount, setTotalAmount] = useState(null);

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartstate?.length; index++) {
      sum =
        sum +
        Number(userCartstate[index]?.quantity) * userCartstate[index].price;
    }
    //console.log(sum, "quantity");
    setTotalAmount(sum);
  }, [userCartstate]);

  const DeleteCartProducts = (id) => {
    dispatch(DeleteCartProduct({ cartItemId: id ,config2:config2}));

    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 300);
  };

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>

            {userCartstate &&
              userCartstate?.map((item, index) => {
                return (
                  <SingleCart
                    key={index}
                    item={item}
                    index={index}
                    DeleteCartProducts={DeleteCartProducts}
                    setTotalAmount={setTotalAmount}
                  />
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>

              {totalamount != null && totalamount !== 0 && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal:₹{totalamount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
