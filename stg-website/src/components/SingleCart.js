import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserCart, updateCartProduct } from "../features/user/userSlice";
import { AiFillDelete } from "react-icons/ai";

const SingleCart = ({ item, index, DeleteCartProducts, setTotalAmount }) => {
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
  const [productUpdateDetail, setproductUpdateDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log(productUpdateDetail?.cartItemId, productUpdateDetail?.quantity);
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart(config2));
      }, 100);
    }
  }, [productUpdateDetail]);
  return (
    <>
      <div
        className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
        key={index}
      >
        <div className="cart-col-1 gap-15 d-flex align-items-center">
          <div className="w-25">
            <img
              src={item?.productId?.images[0]?.url}
              className="img-fluid"
              alt="product"
            />
          </div>
          <div className="w-75">
            <p>{item?.productId?.title}</p>
            <p>Size: {item?.productId?.color}</p>
            <p className="d-flex gap-3">
              color:
              <ul className="colors ps-0">
                <li style={{ backgroundColor: item?.color?.title }}></li>
              </ul>
            </p>
          </div>
        </div>
        <div className="cart-col-2">
          <h5 className="price">₹ {item?.price}</h5>
        </div>
        <div className="cart-col-3 d-flex align-items-center gap-15">
          <div>
            <input
              className="form-control"
              type="number"
              name={"quantity"+item?._id}
              id={"cart"+item?._id}
              min={1}
              max={10}
              value={
                productUpdateDetail?.quantity
                ? productUpdateDetail?.quantity
                : item?.quantity
              }
              onChange={(e) => {
                //console.log(e.target.value, "target");
                setproductUpdateDetail({
                  cartItemId: item?._id,
                  quantity: e.target.value,
                });
              }}
              
            />
          </div>
          <div>
            <AiFillDelete
              onClick={() => DeleteCartProducts(item?._id)}
              className="text-danger "
            />
          </div>
        </div>
        <div className="cart-col-4">
          <h5 className="price">₹ {item.price * item?.quantity}</h5>
        </div>
      </div>
    </>
  );
};

export default SingleCart;
