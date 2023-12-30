import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlog } from "../features/blogs/blogeSlice";

const SingleBlog = () => {
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getaSingleBlog();
  }, []);

  const getaSingleBlog = () => {
    dispatch(getSingleBlog(param.id));
  };

  const blog = useSelector((state) => state?.blog?.singleblog);
  //console.log(blog, " single blog");
  return (
    <>
      <Meta title={blog?.title} />
      <BreadCrumb title={blog?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              <h3 className="title">{blog?.title}</h3>
              <img
                src={blog?.images[0]?.url}
                className="img-fluid w-100 my-4"
                alt="blog"
              />
              <p>{blog?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
