import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const UserPrivate = () => {
  const navigate = useNavigate();
  // Explicitly define the type of 'state' using the RootState interface
  const { userIsAuthenticated, currentauthUser } = useSelector(
    (state) => state.userauth
  );

  // debugger;
  // if (!currentauthUser) return navigate("/login");

  console.log("Current user is ", currentauthUser);

  const isAuthenticatedUser = currentauthUser?.role === "user";

  console.log("userIsAuthenticated", isAuthenticatedUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOrgAuthentication = async () => {
      if (userIsAuthenticated === null) {
        setLoading(true);
        return;
      }

      // else if (userIsAuthenticated === true) {
      //   navigate("/company/dashboard");
      // }

      setLoading(false);
    };

    checkOrgAuthentication();
  }, [userIsAuthenticated, navigate]);

  if (loading) return <Loading />;
  if (userIsAuthenticated && isAuthenticatedUser === false) {
    navigate("/user/login");
    // toast.error("Authentication is false");
  }
  return (
    // Show outlet if authenticated, otherwise redirect to login
    // userIsAuthenticated ? <Outlet /> : navigate("/user/login")
    <>
      {userIsAuthenticated && isAuthenticatedUser ? (
        <Outlet />
      ) : (
        navigate("/user/login")
      )}
    </>
  );
};

export default UserPrivate;
