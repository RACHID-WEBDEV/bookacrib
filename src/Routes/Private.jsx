import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const Private = () => {
  const navigate = useNavigate();
  // Explicitly define the type of 'state' using the RootState interface
  const { isAuthenticated } = useSelector((state) => state.auth);
  // const isAuthorised = currentUser?.role.id;

  // console.log("isAuthenticated private", isAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuthenticated === null) {
        setLoading(true);
        return;
      }

      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // Show loading indicator while waiting for authentication check
  if (loading) return <Loading />;

  return (
    // Show outlet if authenticated, otherwise redirect to login
    // isAuthenticated && isAuthorised ? <Outlet /> : navigate("/login")
    <>{isAuthenticated ? <Outlet /> : navigate("/login")}</>
  );
};

export default Private;
