/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import LogoWhite from "../components/shared/Logo/LogoWhite";
import { ForgetPasswordSchema } from "../schema/authSchema";

import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/forms/Input";
import { Button } from "../components/forms/Button";
import HookForm from "../components/forms/Form";

// import toast from "react-hot-toast";
import { loginThunk } from "../Redux/auth/authThunk";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

const ResendVerification = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  console.log(error);
  // toast.error(error);
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
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
              Resend Verification
            </h3>
            <h3 className="text-base pt-3 text-gray-500 ">
              No worries! Enter your email address and we&apos;ll resend you a
              secure link to reset your password.
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
                      <LoadingSpinner />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    " Resend Email"
                  )}
                </Button>
              </HookForm>

              {/* <p className=" text-gray-600 mt-4">
                If you don&apos;t receive an email,{" "}
                <Link to="/login" className=" text-primary-700 font-medium">
                 
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

export default ResendVerification;
