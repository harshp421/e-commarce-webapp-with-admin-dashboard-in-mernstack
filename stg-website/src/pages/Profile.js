import React, { useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import {FiEdit}  from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const Profile = () => {



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
  
const dispatch=useDispatch();
const navigate=useNavigate();
const authstate =useSelector(state=>state?.auth?.user);
const  updatedstate =useSelector(state=>state?.auth?.updatedUser);
const [edit, setEdit] = useState(true)

    let  profileSchema = yup.object({
        firstname: yup.string().required("**First name is required "),
        lastname: yup.string().required("**Last Name is required"),
        email: yup.string().required("**email is required"),
        mobile: yup.string().required("**mobile number is required"),
       
      });


      const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
          firstname:  authstate?.firstname,
          lastname: authstate?.lastname,
          email: authstate?.email,
          mobile: authstate?.mobile,
        
        },
        validationSchema:  profileSchema,
        onSubmit: (values) => {
           dispatch(updateProfile({data:values,config2:config2}))
           setEdit(true);
          
        },
      });
  return (
    <>
     <Meta title={"My Profile"} />
      <BreadCrumb title="My Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className='my-3'> Update Profile</h3>
                    <FiEdit onClick={()=>setEdit(false)} />
                </div>
            </div>
            <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
  <div class="form-group mb-3">
    <label for="exampleInputEmail1">First Name</label>
    <input type="text " class="form-control" 
    disabled={edit}
    name="firstname" 
     value={formik.values.firstname}
     onChange={formik.handleChange('firstname')}
     onBlur={formik.handleChange('firstname')}
    id="exampleInput0"  placeholder="Enter email"/>
    <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
  </div>
  <div class="form-group mb-3">
    <label for="exampleInput1">Last Name</label>
    <input type="text" name='lastname' 
       disabled={edit}
     value={formik.values.lastname}
     onChange={formik.handleChange('lastname')}
     onBlur={formik.handleChange('lastname')}
    class="form-control" id="exampleInputPassword1" placeholder="Last Name" />
    <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
  </div>

  <div class="form-group mb-3">
    <label for="exampleInput2">Email Address</label>
    <input type="email" name='mobile'
       disabled={edit}
     value={formik.values.email}
     onChange={formik.handleChange('email')}
     onBlur={formik.handleChange('email')}
    class="form-control" id="exampleInputPassword1" placeholder="email" />

<div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
  </div>
  <div class="form-group mb-3">
    <label for="exampleInput1">Mobile No</label>
    <input type="number" name='mobile'  class="form-control" 
       disabled={edit}
     value={formik.values.mobile}
     onChange={formik.handleChange('mobile')}
     onBlur={formik.handleChange('mobile')}
    id="exampleInputPassword1" placeholder="Mobile Number" />
    <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
  </div>
  


  {
    edit === false &&   <button type="submit" class="btn btn-primary">Update</button>
  }
 
</form>
            </div>
          </div>
      </Container>
    </>
  )
}

export default Profile