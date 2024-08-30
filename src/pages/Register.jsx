import { Link } from "react-router-dom";
import Logo from "../components/shared/Logo/Logo";
import { LoginSchema } from "../schema/authSchema";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/forms/Input";
import { Button } from "../components/forms/Button";
import HookForm from "../components/forms/Form";
import { GoogleIcon, Facebook } from "../assets/SvgIcons";
// import toast from "react-hot-toast";
import { loginThunk } from "../Redux/auth/authThunk";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

const Register = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  console.log(error);
  // toast.error(error);
  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    dispatch(loginThunk(data));
  };
  return (
    <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
      <div className="mx-auto h-full max-w-sm">
        <div className="m-auto  py-12">
          <div className="space-y-4">
            <Logo />
          </div>
          <div className="mt-4 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
              Login to your account
            </h3>

            <div className="max-w-xl pt-6">
              <HookForm onSubmit={onSubmit} schema={LoginSchema}>
                <Input
                  name="email"
                  label="Email Address"
                  placeholder="Enter your username"
                />
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />

                <div className=" float-start text-sm mb-4">
                  <Link to="/forget-password">
                    <p className=" text-primary-700 font-medium">
                      Forgot Password?
                    </p>
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  rounded
                  //   disabled={loading}
                  className="w-full justify-center"
                >
                  {loading ? (
                    <div className="inline-flex items-center gap-3">
                      <LoadingSpinner />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </HookForm>

              <p className="text-center text-gray-600 mt-8">
                Already have an account?{" "}
                <Link to="/login" className=" text-primary-700 font-medium">
                  Login
                </Link>
              </p>
              <div className=" mt-4 flex items-center justify-center gap-2">
                <div className="bg-gray-300 h-px w-full"></div>
                <p className="text-center text-gray-600 ">Or</p>
                <div className="bg-gray-300 h-px w-full"></div>
              </div>
              <div className="mt-4 flex flex-wrap sm:grid gap-4 grid-cols-2">
                <button className="w-full h-12 rounded-lg border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                  <div className="w-max mx-auto flex items-center justify-center space-x-2">
                    <GoogleIcon />
                    <span className="block w-max text-sm font-semibold tracking-wide text-gray-700 dark:text-white">
                      Google
                    </span>
                  </div>
                </button>
                <button className="w-full h-12 rounded-lg border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                  <div className="w-max mx-auto flex items-center justify-center space-x-2">
                    <Facebook className="w-6 h-6 text-[#1877F2]" />
                    <span className="block w-max text-sm font-semibold tracking-wide text-gray-700 dark:text-white">
                      Facebook
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
