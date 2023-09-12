import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";
const AdminPrivateRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = async() => {
    try {
      const response = await axios.get('/api/v1/profile');
    //   const data = response.json()
    setIsLoggedIn(true)
        
    //   console.log(axios.response.data)
    } catch (error) {
          setIsLoggedIn(false);
      return navigate('/login');
    }
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      {
        isLoggedIn ? props.children : null
      }
    </React.Fragment>
  );
}
export default AdminPrivateRoute;