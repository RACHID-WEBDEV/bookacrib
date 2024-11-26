import { useNavigate } from "react-router-dom";
import LogoWhite from "../components/shared/Logo/LogoWhite";
import { ForgetPasswordSchema } from "../schema/authSchema";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/forms/Input";
import { Button } from "../components/forms/Button";
import HookForm from "../components/forms/Form";

import toast from "react-hot-toast";

import SmallSpinner from "../components/Loading/SmallSpinner";
import { forgetPasswordThunk } from "../Redux/auth/authThunk";
import Cookies from "js-cookie";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  console.log("err:", error);
  const onSubmit = async (data) => {
    try {
      const result = await dispatch(forgetPasswordThunk(data)).unwrap();
      console.log("forgetpassword", result);
      if (
        (result.status >= 200 && result.status <= 300) ||
        (result.status_code >= 200 && result.status_code <= 300)
      ) {
        const userEmail = JSON.stringify(data);
        Cookies.set("bac_user_reset_email", userEmail, {
          expires: 7,
          sameSite: "None",
          secure: true,
        });

        navigate("/forget-password-sent");
      }
    } catch (error) {
      if (error?.status >= 400 && error?.status <= 499) {
        // const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(error.message, { duration: 6000 });
      }
    }
  };
  // toast.error(error);
  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  //   // dispatch(loginThunk(data));
  // };
  return (
    <div className="m-auto pt-4 lg:pt-20 xl:container px-1 lg:px-12 sm:px-0 mx-auto">
      <div className="mx-auto h-full max-w-lg">
        <div className="m-auto py-12">
          <div className="bg-gray-900 p-4 py-5 space-y-4">
            <LogoWhite />
          </div>
          <div className=" border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 px-4 lg:px-6 py-8 sm:py-10">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Forgot password?
            </h3>
            <h3 className="text-base pt-3 text-gray-500 ">
              No worries, we’ll send you reset instructions.
            </h3>

            <div className="max-w-lg pt-6">
              <HookForm onSubmit={onSubmit} schema={ForgetPasswordSchema}>
                <Input
                  name="email"
                  // label="Email Address"
                  placeholder="Enter your email"
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
                    "Reset Password"
                  )}
                </Button>
              </HookForm>

              {/* <p className=" text-gray-600 mt-4">
                If you don&apos;t receive an email,{" "}
                <Link
                  to="/resend-verification-link"
                  className=" text-primary-700 font-medium"
                >
                  Resend Email
                </Link>{" "}
                check your spam folder or contact support
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
