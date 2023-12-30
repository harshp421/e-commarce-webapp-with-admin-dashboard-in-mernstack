import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
const SpecialProduct = ({ item }) => {
  const navigate=useNavigate();
  const { brand, title, totalrating, price, quantity, sold, images,_id } = item;
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between overflow-hidden " style={{height:"380px"}}>
            <div className="col-5">
              <img src={images[1].url} className="img-fluid" alt="watch" />
            </div>
            <div className="special-product-content col-6">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">{title.substr(0, 15)}</h6>
              <ReactStars
                count={5}
                size={24}
                value={Number(totalrating)}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">₹{price}</span> &nbsp;{" "}
                <strike>₹1000</strike>
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>5 </b>days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p>Products: {quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: quantity / quantity + sold * 100 }}
                    aria-valuenow={quantity / quantity + sold * 100}
                    aria-valuemin={quantity}
                    aria-valuemax={sold + quantity}
                  ></div>
                </div>
              </div>
              <Link className="button"  to={`/product/${_id}`}>View</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
