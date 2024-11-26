import { Link } from "react-router-dom";
import LogoWhite from "../components/shared/Logo/LogoWhite";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import classNames from "classnames";
import Cookies from "js-cookie";
import { Button } from "../components/forms/Button";
import { SuccessCheckIcon } from "../assets/SvgIcons";
import Modal from "../components/Modal/Modal";
import SmallSpinner from "../components/Loading/SmallSpinner";
import { forgetPasswordThunk } from "../Redux/auth/authThunk";

const ForgetPasswordSent = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState("");

  const userEmail = Cookies.get("bac_user_reset_email")
    ? JSON.parse(Cookies.get("bac_user_reset_email"))
    : null;
  // console.log(" admin email: ", userEmail);

  // const adminForgotMessage = Cookies.get("bac_user_reset_email")
  //   ? JSON.parse(Cookies.get("bac_admin_reset_message"))
  //   : null;
  // console.log(" second:", adminForgotMessage);

  const timeInterval = 15 * 60; //  minutes * seconds
  const [seconds, setSeconds] = useState(timeInterval);

  useEffect(() => {
    let intervalId;

    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [seconds]);

  console.log(error);

  // const filteredFormData = {
  //   email: adminForgotMessage?.email,
  // };
  const onSubmit = async () => {
    // console.log("data", data);
    try {
      const result = await dispatch(forgetPasswordThunk(userEmail)).unwrap();
      console.log("resend", result);
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result.message);
        setSignupSuccess(result?.message);
        setShowModalSuccess(true);
        Cookies.remove("bac_user_reset_email");
        // navigate("/");
      }
    } catch (error) {
      console.log("response error: ", error);
      if (
        (error?.status >= 400 && error?.status <= 499 && error?.errors) ||
        (error?.status_code >= 400 &&
          error?.status_code <= 499 &&
          error?.errors)
      ) {
        const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.message, { duration: 6000 });
      }
      // if (error?.status >= 400 && error?.status <= 499) {
      //   // const errorMessages = Object.values(error?.errors).flat().join(", ");
      //   toast.error(error.message, { duration: 6000 });
      // }
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
            <div className="mb-0 mx-auto text-gray-400 w-16 h-16">
              <SuccessCheckIcon />
            </div>
            <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-white">
              Forget Password Link Sent
            </h3>
            <h3 className="text-sm pt-3 text-gray-500 ">
              We&apos;ve sent a password reset link to{" "}
              <span className=" font-semibold text-gray-800">
                {userEmail?.email === null || userEmail?.email === undefined
                  ? "your email"
                  : userEmail?.email}
              </span>
              . Please check your inbox. If the email doesn&apos;t arrive, check
              your spam folder. For further assistance, contact our{" "}
              <span className=" font-semibold text-gray-800 cursor-pointer">
                support team.{" "}
              </span>
              {/* We&apos;ve sent a password reset link to{" "}
              <span className=" font-semibold">{userEmail?.email}</span>.
              Please check your inbox */}
            </h3>

            <div className="max-w-lg pt-6">
              {/* <HookForm onSubmit={onSubmit} schema={ForgetPasswordSchema}> */}
              <p className="text-right text-primary-700 font-medium mt-1">
                <span
                  className={classNames({
                    "opacity-50": seconds >= 1 && seconds <= timeInterval,
                    "opacity-0": seconds === 0,
                  })}
                >
                  Resend in{" "}
                </span>
                <span className=" text-gray-500 text-sm">
                  {seconds === 0 ? (
                    <span className=" flex flex-wrap justify-end gap-1">
                      Click{" "}
                      <span
                        onClick={() => onSubmit()}
                        className=" text-gray-700 cursor-pointer"
                      >
                        {" "}
                        resend reset link.
                      </span>
                      {loading && <SmallSpinner />}
                      {/* OR
                      <Link
                        to="/resend-verification"
                        className=" text-gray-700 "
                      >
                        {" "}
                        use another email
                      </Link> */}
                    </span>
                  ) : (
                    <span>
                      {Math.floor(seconds / 60)
                        .toString()
                        .padStart(2, "0")}
                      :{(seconds % 60).toString().padStart(2, "0")}
                    </span>
                  )}{" "}
                </span>
              </p>
              {/* <p className="text-right  text-primary-700 font-medium mt-1">
                  <span
                    className={classNames(
                      { "opacity-50": seconds >= 1 && seconds <= 60 },
                      { "opacity-0": seconds === 0 }
                    )}
                  >
                    Resend Forget Password Email in{" "}
                  </span>
                  <span
                  // className="cursor-pointer"
                  // onClick={handleResendVerification}
                  >
                    {seconds === 0 ? (
                      <Link to="/resend-verification">Click Resend Email.</Link>
                    ) : (
                      <span>
                        00:
                        {seconds <= 9 && "0"}
                        {seconds}
                      </span>
                    )}{" "}
                  </span>
                </p> */}
              {/* </HookForm> */}

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
      {showModalSuccess && (
        <Modal
          //   handleModal={handleCancelBooking}
          setShowModal={setShowModalSuccess}
          title="Sent Successfully"
          //   loading={loadingCancelBooking}
          description={signupSuccess}
          icon={<SuccessCheckIcon />}
          buttons={
            <div className=" flex items-center justify-center flex-wrap gap-4">
              <Link to="/">
                <Button
                  className=" w-44 justify-center"
                  // onClick={() => handleCancelBooking()}
                >
                  Go Back Home
                </Button>
              </Link>

              {/* <Button
                color="primaryAlt"
                outline
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button> */}
            </div>
          }
        />
      )}
    </div>
  );
};

export default ForgetPasswordSent;
