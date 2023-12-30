import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createsize,
  getAsize,
  resetState,
  updateAsize,
} from "../features/size/sizeSlice";
let schema = yup.object().shape({
  title: yup.string().required("Size is Required"),
});
const Addsize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getSizeId = location.pathname.split("/")[3];
  const newSize = useSelector((state) => state.size);
   // //console.log(newSize,"new size");
  const {
    isSuccess,
    isError,
    isLoading,
    createdSize,
    updatedSize,
    SizeName,
  } = newSize;

  useEffect(() => {
    if (getSizeId !== undefined) {
      dispatch(getAsize(getSizeId));
    } else {
      dispatch(resetState());
    }
  }, [getSizeId]);
  useEffect(() => {
    
    
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isError]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: SizeName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getSizeId !== undefined) {
        const data = { id: getSizeId, SizeData: values };
        dispatch(updateAsize(data))
        if (isSuccess && updatedSize !=null) {
          toast.success("Size Updated Successfullly!");
          navigate("/admin/list-Size");
        };
        setTimeout(() => {
          dispatch(resetState());
        }, 300);  
      } else {
        dispatch(createsize(values));
        if (isSuccess && createdSize) {
          toast.success("Size Added Successfullly!");
          navigate("/admin/list-Size");
        }
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getSizeId !== undefined ? "Edit" : "Add"} Size
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="Size"
            label="Enter Product Size"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="Size"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getSizeId !== undefined ? "Edit" : "Add"} Size
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addsize;
