import { Navigate } from "react-router-dom";


const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};



export default function setupAxios(axios,user,navigate) {
  axios.interceptors.request.use(
    (config) => {
      //console.log(user,"user");
      if (user !==null) {
        config.headers.Authorization = `Bearer ${user.token}`
      }
      
       //console.log("colled");

      return config
    },
    (err) => {
      //console.log(err);
      return err.response;
    }
  )

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //console.log(error,"error in interceper")
      if (error.response && error.response.data.message.includes("404")) {
        // Handle token expiration error (HTTP status 401)
        // Redirect to the login page or any other desired action
       // navigate('/'); // Adjust the path as needed
       window.location.replace("/");
       localStorage.clear();

      }
      return Promise.reject(error);
    }
  );

}
