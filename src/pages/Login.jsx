import { Link, useNavigate } from "react-router-dom";
import LogoWhite from "../components/shared/Logo/LogoWhite";
import { LoginSchema } from "../schema/authSchema";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/forms/Input";
import { Button } from "../components/forms/Button";
import HookForm from "../components/forms/Form";
// import { GoogleIcon, Facebook } from "../assets/SvgIcons";
// import toast from "react-hot-toast";
import { loginThunk } from "../Redux/auth/authThunk";
import SmallSpinner from "../components/Loading/SmallSpinner";
import toast from "react-hot-toast";
import { useEffect } from "react";
// import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  // // Explicitly define the type of 'state' using the RootState interface
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isAuthenticated === null) {
        // setLoading(true);
        return;
      }

      if (isAuthenticated) {
        navigate("/");
      }
      // setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]); // Dependency array to ensure useEffect() runs only when needed

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  console.log(error);
  // toast.error(error);
  const onSubmit = async (data) => {
    // alert(JSON.stringify(data));

    try {
      const result = await dispatch(loginThunk(data)).unwrap();
      console.log("login :", result);

      if (
        result?.access_token !== ""
        // result.status >= 200 && result.status <= 300
      ) {
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("first error: ", error);
      toast.error(error, { duration: 6000 });
      // if (error?.status >= 400 && error?.status <= 499) {
      //   // const errorMessages = Object.values(error?.errors).flat().join(", ");
      // }
    }
    // dispatch(loginThunk(data));
  };

  return (
    <div className="m-auto pt-4 lg:pt-20 xl:container px-1 lg:px-12 sm:px-0 mx-auto">
      <div className="mx-auto h-full max-w-lg">
        <div className="m-auto py-12">
          <div className="bg-gray-900 p-4 py-5 space-y-4">
            <LogoWhite />
          </div>
          <div className=" border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 px-4 lg:px-6 py-8 sm:py-10">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Login
            </h3>
            <h3 className="text-base pt-3 text-gray-500 ">Welcome Back!</h3>

            <div className="max-w-lg pt-6">
              <HookForm onSubmit={onSubmit} schema={LoginSchema}>
                <Input
                  name="email"
                  // label="Email Address"
                  placeholder="Enter your email"
                />

                <Input
                  name="password"
                  // label="Password"
                  type="password"
                  placeholder="Password"
                />
                <p className="text-right text-gray-600 text-sm mb-4">
                  <Link
                    to="/forget-password  "
                    className=" text-primary-700 font-medium"
                  >
                    {" "}
                    Forgot Password?
                  </Link>
                </p>
                <Button
                  type="submit"
                  size="lg"
                  //   disabled={loading}
                  className="w-full justify-center"
                >
                  {loading ? (
                    <div className="inline-flex items-center gap-3">
                      <SmallSpinner />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </HookForm>

              <p className="text-right text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link to="/sign-up  " className=" text-primary-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
