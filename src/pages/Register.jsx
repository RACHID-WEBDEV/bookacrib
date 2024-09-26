import { Link, useNavigate } from "react-router-dom";
import LogoWhite from "../components/shared/Logo/LogoWhite";
import { SignUpSchema } from "../schema/authSchema";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/forms/Input";
import { Button } from "../components/forms/Button";
import HookForm from "../components/forms/Form";

import toast from "react-hot-toast";
import { signupThunk } from "../Redux/auth/authThunk";
import SmallSpinner from "../components/Loading/SmallSpinner";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // console.log(error);
  // toast.error(error);
  const onSubmit = async (data) => {
    try {
      const result = await dispatch(signupThunk(data)).unwrap();

      if (result.status >= 200 && result.status <= 300) {
        navigate("/login");
      }
    } catch (error) {
      if (error?.status >= 400 && error?.status <= 499) {
        const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(errorMessages, { duration: 6000 });
      }
    }
    // alert(JSON.stringify(data));
    // dispatch(signupThunk(data));
    // navigate("/login");
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
              Sign Up
            </h3>
            <h3 className="text-base pt-3 text-gray-500 ">
              Create your account in seconds! Fill out the form below to get
              started with Bookacrib.
            </h3>

            <div className="max-w-lg pt-6">
              <HookForm onSubmit={onSubmit} schema={SignUpSchema}>
                <div className="grid lg:grid-cols-2 lg:gap-3 w-full ">
                  <div className="">
                    <Input
                      name="first_name"
                      // label="First Name"
                      placeholder="First name"
                    />
                  </div>
                  <div className="">
                    <Input
                      name="last_name"
                      // label="Last Name"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <Input
                  name="email"
                  // label="Email Address"
                  placeholder="Enter your email"
                />
                <Input
                  name="phone_number"
                  // label="Email Address"
                  placeholder="Phone Number"
                />
                <Input
                  name="password"
                  // label="Password"
                  type="password"
                  placeholder="Password"
                />
                <Input
                  name="password_confirmation"
                  // label="Password"
                  type="password"
                  placeholder="Confirm Password"
                />

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
                    "Sign Up"
                  )}
                </Button>
              </HookForm>

              <p className="text-right text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className=" text-primary-700 font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
