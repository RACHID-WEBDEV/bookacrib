/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import HeaderNew from "../components/ui/HeaderNew";
const Public = () => {
  // const navigate = useNavigate();
  // Explicitly define the type of 'state' using the RootState interface
  // const { isAuthenticated } = useSelector((state) => state.auth);
  //  const [loading, setLoading] = useState(true);

  // const { userIsAuthenticated } = useSelector((state) => state.userauth);

  // console.log("organizationis authenticated", organizationIsAuthenticated);

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     if (isAuthenticated === null) {
  //       setLoading(true);
  //       return;
  //     }

  //     if (isAuthenticated) {
  //       navigate("/dashboard");
  //     }
  //     setLoading(false);
  //   };

  //   checkAuthentication();
  // }, [isAuthenticated, navigate]); // Dependency array to ensure useEffect() runs only when needed

  // useEffect(() => {
  //   const checkUserAuthentication = async () => {
  //     if (userIsAuthenticated === null) {
  //       setLoading(true);
  //       return;
  //     }

  //     if (userIsAuthenticated) {
  //       navigate("/");
  //     }
  //     setLoading(false);
  //   };

  //   checkUserAuthentication();
  // }, [userIsAuthenticated, navigate]);

  // Show loading indicator while waiting for authentication check
  // if (loading) return <Loading />;

  // Show outlet if authenticated, otherwise redirect to login
  // return !isAuthenticated ? <Outlet /> : null;
  return (
    <>
      {/* <Header /> */}
      <HeaderNew />
      <Outlet />
      <Footer />
    </>
  );
};

export default Public;
