import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const CribPrivate = () => {
  const navigate = useNavigate();
  // Explicitly define the type of 'state' using the RootState interface
  const { isAuthenticated, switchToCompany, companyId } = useSelector(
    (state) => state.auth
  );
  // const isAuthorised = currentUser?.role.id;

  // console.log("isAuthenticated private", isAuthenticated);

  console.log("Company companyId___:::", companyId);
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
  }, [isAuthenticated, switchToCompany, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // Show loading indicator while waiting for authentication check
  if (loading) return <Loading />;

  return (
    // Show outlet if authenticated, otherwise redirect to login
    // isAuthenticated && isAuthorised ? <Outlet /> : navigate("/login")
    <>
      {isAuthenticated && switchToCompany && companyId ? (
        <Outlet />
      ) : (
        navigate("/user/dashboard")
      )}
    </>
    // <Outlet />
  );
};

export default CribPrivate;
