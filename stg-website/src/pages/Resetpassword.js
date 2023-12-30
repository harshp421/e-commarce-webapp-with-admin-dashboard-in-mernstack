import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/user/userSlice";
const Resetpassword = () => {

  const params=useParams();
  const tokan=params.token;
  const navigate=useNavigate();
  const dispatch=useDispatch();

  let passwordSchema = yup.object({
    password: yup.string().required("**Password is required "),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
          dispatch(resetPassword({token:tokan,password:values.password}));
          navigate('/login')
    },
  });
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form action="" 
               onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-15">
                <CustomInput
                 
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                 <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Ok</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Resetpassword;
