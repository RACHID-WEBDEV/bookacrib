import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const Private = () => {
  const navigate = useNavigate();
  // Explicitly define the type of 'state' using the RootState interface
  const { isAdminAuthenticated } = useSelector((state) => state.adminauth);
  // const isAuthorised = currentUser?.role.id;

  // console.log("isAdminAuthenticated private", isAdminAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAdminAuthenticated === null) {
        setLoading(true);
        return;
      }

      setLoading(false);
    };

    checkAuthentication();
  }, [isAdminAuthenticated, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // Show loading indicator while waiting for authentication check
  if (loading) return <Loading />;

  return (
    // Show outlet if authenticated, otherwise redirect to login
    // isAuthenticated && isAuthorised ? <Outlet /> : navigate("/login")
    <>{isAdminAuthenticated ? <Outlet /> : navigate("/admin/login")}</>
    // <Outlet />
  );
};

export default Private;
