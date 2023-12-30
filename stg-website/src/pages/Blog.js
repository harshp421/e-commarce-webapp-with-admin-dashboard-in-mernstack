import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogeSlice";
import moment from "moment";

const Blog = () => {

   const dispatch = useDispatch();
   useEffect(() => {
      getAllBlog();
   }, []);

   const getAllBlog = () => {
     dispatch(getAllBlogs());
   };

   const blogs = useSelector((state) => state?.blog?.blog);
   //console.log(blogs,"blogs");
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Shirt</li>
                  <li>T-Shirt</li>
                  <li>Jeans</li>
                  <li>Jecket</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {
                
                blogs &&
                blogs?.map((item,index)=>{
                  return (
                    <div className="col-6 mb-3" key={item?._id}>
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
                })
              }
              
             
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
