import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import service01 from "../images/service.png";
import service02 from "../images/service-02.png";
import service03 from "../images/service-03.png";
import service04 from "../images/service-04.png";
import service05 from "../images/service-05.png";
import prodcompare from "../images/prodcompare.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogeSlice";
import moment from "moment";
import {
  addToCompare,
  addToWishList,
  getAllProducts,
} from "../features/products/productSlice";
import addcart from "../images/add-cart.svg";
import wish from "../images/wish.svg";
import view from "../images/view.svg";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state?.blog?.blog);
  const product = useSelector((state) => state?.product?.product?.product);

  //console.log(product, "product");
  useEffect(() => {
    getAll();
  }, []);
  const addToWish = (id) => {
    dispatch(addToWishList(id));
    toast.success("Product Added successfully");
  };
  const getAll = () => {
    dispatch(getAllBlogs());
    dispatch(getAllProducts());
  };
  let location = useLocation();
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=1600"
                className="img-fluid rounded-3 h-50"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>stylish and confy. </h4>
                <h5>Hoodie's</h5>
                <p>Starting At 700</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERstyliest.</h4>
                  <h5>OverSized </h5>
                  <p>From 400 or 1500.</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="https://images.pexels.com/photos/783243/pexels-photo-783243.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERstyliest.</h4>
                  <h5>Woman's Tshirt</h5>
                  <p>From 400 or 1500.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="https://images.pexels.com/photos/1311590/pexels-photo-1311590.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERstyliest .</h4>
                  <h5>Printed Tshirt</h5>
                  <p>From 400 or 1500.</p>
                </div>
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERstyliest </h4>
                  <h5>party dresses</h5>
                  <p>From 400 or 1500.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="service d-flex align-items-center justify-content-between ">
                <div className="d-flex align-items-center gap-15">
                  <img src={service01} alt="services" />
                  <div>
                    <h6> Free Shipping </h6>
                    <p className="mb-0">from all order above 500 </p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src={service02} alt="services" />
                  <div>
                    <h6>Daily surprice Offer</h6>
                    <p className="mb-0"> save upto 25% off </p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src={service03} alt="services" />
                  <div>
                    <h6>Support 24/7 </h6>
                    <p className="mb-0"> Shop with an export </p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src={service04} alt="services" />
                  <div>
                    <h6>Affortable Prices </h6>
                    <p className="mb-0"> Get fectory Default price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src={service05} alt="services" />
                  <div>
                    <h6>Secure Payment</h6>
                    <p className="mb-0"> 100 % protected payment </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container> */}

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>
                    <Link to={"/product"}> Man's t-shirt</Link>
                  </h6>
                  <p>10 Items</p>
                </div>
                <div className="w-24">
                  <img
                    src="https://cdna.lystit.com/photos/717e-2014/01/30/nike--futura-logo-t-shirt-product-1-16964995-0-335918059-normal.jpeg"
                    alt="camera"
                    className="img-fluide "
                    style={{ width: "110px", height: "110px" }}
                  />{" "}
                </div>
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>
                    <Link to={"/product"}> Man's shirt</Link>
                  </h6>
                  <p>10 Items</p>
                </div>
                <div className="w-24">
                  <img
                    src="https://imgs.search.brave.com/nP2-D-o-MIrCjW0tL5pwZ0730YYSbBK9gdgzJyH74-U/rs:fit:534:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5F/WXBXM3hMUXpwNkl4/NVd5UDJPbEtBSGFH/ayZwaWQ9QXBp"
                    alt="camera"
                    className="img-fluide "
                    style={{ width: "110px", height: "110px" }}
                  />
                </div>
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>
                    <Link to={"/product"}> Woman's t-shirt</Link>
                  </h6>
                  <p>10 Items</p>
                </div>
                <div className="w-24">
                  <img
                    src="https://imgs.search.brave.com/rApZ-Wegkwi1LPXMvTiFr9rtFenG6OAmMxjKRPvWUfg/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5F/TV9JalJ5M0hrc1I0/eUpQeFJFVk5RSGFI/YSZwaWQ9QXBp"
                    alt="camera"
                    className="img-fluide "
                    style={{ width: "110px", height: "110px" }}
                  />{" "}
                </div>
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>
                    <Link to={"/product"}> cap's</Link>
                  </h6>

                  <p>10 Items</p>
                </div>
                <div className="w-24">
                  <img
                    src="https://imgs.search.brave.com/ni-jMYwhB_l2CSnwgtBJl_0etAwaYAxNsvDknfxJdu8/rs:fit:592:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5k/YUpWUldsTDNBXzNL/QmlsU21Ic1pRSGFG/NyZwaWQ9QXBp"
                    alt="camera"
                    className="img-fluide "
                    style={{ width: "110px", height: "110px" }}
                  />{" "}
                </div>
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>
                    <Link to={"/product"}> men's hoodies</Link>
                  </h6>

                  <p>10 Items</p>
                </div>
                <div className="w-24">
                  <img
                    src="https://imgs.search.brave.com/UDHuL6VbedW4Im_tTsC4mU47Lnm2a4pYvc8awqfZSyQ/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5W/WUhNV1BnejNFOTh1/cWtDUjdJZjlRQUFB/QSZwaWQ9QXBp"
                    alt="camera"
                    className="img-fluide "
                    style={{ width: "110px", height: "110px" }}
                  />{" "}
                </div>
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>
                    <Link to={"/product"}> women's cargo</Link>
                  </h6>

                  <p>10 Items</p>
                </div>
                <div className="w-24">
                  <img
                    src="https://imgs.search.brave.com/JNLwKAvSUJOHrLpS4Z4_6BL0eNISCmX95k4AlveZ_yw/rs:fit:316:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5z/VzFKZU5fN0NUZ0pE/SG1VT0hpVmZBSGFM/SCZwaWQ9QXBp"
                    alt="camera"
                    className="img-fluide "
                    style={{ width: "110px", height: "110px" }}
                  />{" "}
                </div>
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>
                    <Link to={"/product"}> Man's cargo</Link>
                  </h6>

                  <p>10 Items</p>
                </div>
                <div className="w-24">
                  <img
                    src="https://imgs.search.brave.com/d4aYL1EJS8wkPxZWIe39ezOvAMjKlzqeBEJ9MG_Lmfw/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Ux/LmV4cGxpY2l0LmJp/bmcubmV0L3RoP2lk/PU9JUC5HSTVFRk9q/M0wzWWxSbGthRVhE/X1dBQUFBQSZwaWQ9/QXBp"
                    alt="camera"
                    className="img-fluide "
                    style={{ width: "110px", height: "110px" }}
                  />{" "}
                </div>
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>
                    <Link to={"/product"}> Man's jeans</Link>
                  </h6>

                  <p>10 Items</p>
                </div>
                <div className="w-24">
                  <img
                    src="https://imgs.search.brave.com/UPP8FeFSlTTb43P8PEgRqlnTmr0OCIIBaKkMcpD1Hx0/rs:fit:483:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/M2U5LTF4aF9tUWZ4/ejN2WTZyLWF3QUFB/QSZwaWQ9QXBp"
                    alt="camera"
                    className="img-fluide "
                    style={{ width: "110px", height: "110px" }}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {product &&
            product?.map((item, index) => {
              //console.log(index, "index");
              if (item?.tags === "featured") {
                if (index > 2) {
                  return (
                    <div className="col-3" key={index}>
                      <div className="product-card position-relative">
                        <div className="wishlist-icon position-absolute">
                          <button
                            className="border-0 bg-transparent"
                            onClick={(e) => addToWish(item?._id)}
                          >
                            <img src={wish} alt="wishlist" />
                          </button>
                        </div>
                        <div className="product-image">
                          <img
                            src={item?.images[1]?.url}
                            className="img-fluid"
                            alt="product"
                          />
                          <img
                            src={item?.images[0]?.url}
                            className="img-fluid"
                            alt="product "
                          />
                        </div>

                        <div className="product-details">
                          <h6 className="brand"> {item?.brand}</h6>
                          <h5 className="product-title">{item?.title}</h5>

                          <p className="price">{item?.price}</p>
                        </div>
                        <div className="action-bar position-absolute">
                          <div className="d-flex flex-column gap-15">
                            <button className="border-0 bg-transparent">
                              <img
                                src={prodcompare}
                                alt="compare"
                                onClick={() => {
                                  dispatch(addToCompare(item));
                                  toast.success("Product added to compare");
                                }}
                              />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img
                                onClick={() =>
                                  navigate("/product/" + item?._id)
                                }
                                src={view}
                                alt="view"
                              />
                            </button>
                            <button className="border-0 bg-transparent">
                              <img src={addcart} alt="addcart" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            })}
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="https://images.pexels.com/photos/1376040/pexels-photo-1376040.jpeg?auto=compress&cs=tinysrgb&w=1600"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Women's</h5>
                <h6>All ethnic wear</h6>
                <p>Starting from ₹1000</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="https://images.pexels.com/photos/8692304/pexels-photo-8692304.jpeg?auto=compress&cs=tinysrgb&w=1600"
                className="img-fluid "
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Men's</h5>
                <h6 className="text-dark">Trditional wear</h6>
                <p className="text-dark">Starting at ₹700</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="https://images.pexels.com/photos/8887111/pexels-photo-8887111.jpeg?auto=compress&cs=tinysrgb&w=1600"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-light">Women's</h5>
                <h6 className="text-light">ethnic and fusionwear.</h6>
                <p className="text-light">Starting at ₹1000</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="https://images.pexels.com/photos/6578463/pexels-photo-6578463.jpeg?auto=compress&cs=tinysrgb&w=1600"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Men's</h5>
                <h6 className="text-light">casual shirts.</h6>
                <p className="text-dark">Starting at ₹500</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {product &&
            product?.map((item, index) => {
              if (item?.tags === "special")
                return <SpecialProduct key={index} item={item} />;
            })}
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {product &&
            product?.map((item, index) => {
              if (item?.tags === "popular") {
                return (
                  <div className="col-3" key={index}>
                    <div
                      // to={`${
                      //   location.pathname === "/"
                      //     ? "/product/:id"
                      //     : location.pathname === "/product/:id"
                      //     ? "/product/:id"
                      //     : ":id"
                      // }`}
                      className="product-card position-relative"
                    >
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => addToWish(item?._id)}
                        >
                          <img src={wish} alt="wishlist" />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[1]?.url}
                          className="img-fluid"
                          alt="product image"
                        />
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid"
                          alt="product image"
                        />
                      </div>

                      <div className="product-details">
                        <h6 className="brand"> {item?.brand}</h6>
                        <h5 className="product-title">{item?.title}</h5>

                        <p className="price">{item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button>
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/05/Zara-Logo.png"
                    style={{ width: "120px" }}
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/04/HM-Logo-700x394.png"
                    style={{ width: "120px" }}
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/04/Levis-Logo-120x67.png"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/04/Louis-Vuitton-Logo-120x67.png"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/04/Air-Jordan-Logo-120x67.png"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/04/Supreme-Logo-120x67.png"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogs &&
            blogs?.map((item, index) => {
              if (index < 4) {
                return (
                  <div className="col-3" key={item?._id}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      images={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM do YYYY h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
