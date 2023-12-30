import {Navigate, navigate} from 'react-router-dom';


export const PrivateRoute=({children})=>{
    const getTokenFromLocalStorage= JSON.parse(localStorage.getItem("customer"));
      //console.log( getTokenFromLocalStorage?.token,"tokrn");
    return getTokenFromLocalStorage?.token    === undefined ? (<Navigate to='/login' replace={true}/>):children
}