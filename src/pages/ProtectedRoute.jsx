// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import Loader from '../Components/Loader';
const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate()
  const style = {
    backgroundColor: "#293A58",
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('User state changed:', user); // Debugging linesetIsAuthenticated(!!user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    // return <Loader style={style}/> // You can replace this with a loader/spinner component
return <p>loading.....</p>  
}

  if (!isAuthenticated) {
    return navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;