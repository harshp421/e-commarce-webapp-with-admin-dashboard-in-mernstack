import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, getAProduct, resetState, updateProduct } from "../features/product/productSlice";
import { getsizes } from "../features/size/sizeSlice";


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  size: yup
    .array()
    .min(1, "Pick at least one size")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [images, setImages] = useState ([]);
  //console.log(color);
  const getProductId=location.pathname.split("/")[3];
  useEffect(() => {
    if(getProductId != undefined)
    {
       dispatch(getAProduct(getProductId))
    }
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    dispatch(getsizes());
    
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const  sizeState = useSelector((state) => state.size.sizes);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const [isUploading, setIsUploading] = useState(false);
  const { isSuccess, isError, isLoading, createdProduct ,SingleProduct} = newProduct;

 const SingleProductColor=[];
 const SingleProductSize=[];
  
    SingleProduct && SingleProduct.color.forEach((i)=>{
      SingleProductColor.push(
       i._id
      );
    })  
    SingleProduct && SingleProduct.size.forEach((i)=>{
      SingleProductSize.push(
       i._id
      );
    })  


    
  //console.log(SingleProductColor,"single product color ");

  const coloropt = [];
 colorState && colorState.forEach((i) => {
    coloropt.push({
      label:i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState && imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
   const sizeopt=[];
   sizeState && sizeState.forEach((i) => {
    sizeopt.push({
      label: i.title,
      value: i._id,
    });


  });  


  

  useEffect(() => {
     formik.values.color = color ? color : [];
    formik.values.images = img;
    formik.values.size=size?size:[];
  }, [imgState,color,size]);

  const formik = useFormik({
    initialValues: {
      title:  SingleProduct!= null && getProductId  ? SingleProduct.title
      :"",
      description:  SingleProduct!= null && getProductId  ? SingleProduct.description
      :"",
      price: SingleProduct!= null && getProductId  ? SingleProduct.price
      :"",
      brand: SingleProduct!= null && getProductId  ? SingleProduct.brand
      :"",    
      category: SingleProduct!= null && getProductId  ? SingleProduct.category
      :"",
      tags: SingleProduct!= null && getProductId  ? SingleProduct.tags
      :"",
      color: SingleProduct!= null && getProductId  ? SingleProductColor
      :[],
      quantity: SingleProduct!= null && getProductId  ? SingleProduct.quantity
      :"",
      images: SingleProduct!= null && getProductId  ? SingleProduct.images
      :"",
      size:SingleProduct!= null && getProductId  ? SingleProductSize  
      :[]
    },
    validationSchema: schema,
    enableReinitialize:true,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        // If editing a product, update it
        dispatch(updateProduct(getProductId,values )).unwrap().then((responce)=>{
           if(responce.status=== true)
           {
             toast.success(responce.message);
             formik.resetForm();
              navigate('/admin/list-product')
           }
           else
           {
             toast.error("failed to update product");
           }
        }).catch((error)=>{
          //console.log(error);
          toast.error(error.message);
        })
      } else {
        // If creating a new product, add it
        //console.log(values);
        dispatch(createProducts(values)).unwrap().then((responce)=>{
          if(responce.status== true)
          {
            toast.success(responce.message);
            formik.resetForm();
            navigate('/admin/list-product')
          }
          else
          {
            toast.error("failed to add product");
          }
        }).catch((error)=>{
            //console.log(error,"error in create ");
            toast.error(error?.response?.data.message);
        })
      }
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  const handleColors = (e) => {
    setColor(e);
      };

  const handleSize = (e) => {
    setSize(e);  
  };
  
  const handleUpload = (acceptedFiles) => {
    setIsUploading(true);
    dispatch(uploadImg(acceptedFiles))
      .then(() => {
        setIsUploading(false);
      })
      .catch((error) => {
        setIsUploading(false);
        toast.error("Image upload failed. Please try again.");
      });
  };
  return (
    <div>
      <h3 className="mb-4 title">{getProductId ? "Update Product" : "Add Product"}</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            value={formik.values.color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
       
       <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select Size"
            value={formik.values.size}
            onChange={(i) => handleSize(i)}
            options={sizeopt}
          />
          <div className="error">
            {formik.touched.size && formik.errors.size}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
          <Dropzone onDrop={handleUpload}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isUploading ? (
                      <p>Uploading...</p>
                    ) : (
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
         
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}

          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
           {getProductId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
