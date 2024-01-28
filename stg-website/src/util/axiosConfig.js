export const base_url="https://e-commarce-webapp-with-admin-dashboard-api.vercel.app/api/"

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};



export default function setupAxios(axios,user) {
  axios.interceptors.request.use(
    (config) => {
      // const {
      //   auth: {accessToken},
      // } = store.getState()

      if (user !==null) {
        config.headers.Authorization = `Bearer ${user.token}`
      }
      
       //console.log("colled");

      return config
    },
    (err) => {
      console.log(err,"error inn axios intercepter")
      return err.response;
    }
  )
   
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error,"error in interceper")
      if (error.response && error.response.data.message.includes("404")) {
        // Handle token expiration error (HTTP status 401)
        // Redirect to the login page or any other desired action
       // navigate('/'); // Adjust the path as needed
       window.location.replace("/login");
       localStorage.clear();

      }
      return Promise.reject(error);
    }
  );
}
