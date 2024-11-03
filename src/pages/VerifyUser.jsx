/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { accountVerificationThunk } from "../Redux/auth/authThunk";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const VerifyUser = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams.get("ts");
  // const userEmail = searchParams.get("email");

  const userdata = useMemo(
    () => ({
      // email: userEmail,
      verification_token: token,
    }),
    [token]
  );

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await dispatch(
          accountVerificationThunk(userdata)
        ).unwrap();
        console.log("forgetpassword", result);
        if (result.status >= 200 && result.status <= 300) {
          navigate("/login");
        }
      } catch (error) {
        if (error?.status >= 400 && error?.status <= 499) {
          toast.error(error.message, { duration: 6000 });
          navigate("/");
        } else {
          console.error("Unexpected error:", error);
          toast.error("An unexpected error occurred.");
        }
      }
    };

    verifyUser();
  }, [dispatch]);

  return (
    <div className="w-screen h-screen  flex items-center justify-center">
      {/* <p className="text-2xl">This is a Verify User Page</p> */}
      <span className="loader"></span>
    </div>
  );
};

export default VerifyUser;

// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { accountVerificationThunk } from "../Redux/auth/authThunk";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

// const VerifyUser = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const token = searchParams.get("ts");
//   const userEmail = searchParams.get("email");

//   const userdata = {
//     email: userEmail,
//     verification_token: token,
//   };

//   useEffect(async () => {
//     try {
//       const result = await dispatch(
//         accountVerificationThunk(userdata)
//       ).unwrap();
//       console.log("forgetpassword", result);
//       if (result.status >= 200 && result.status <= 300) {
//         navigate("/login");
//       }
//     } catch (error) {
//       if (error?.status >= 400 && error?.status <= 499) {
//         toast.error(error.message, { duration: 6000 });
//       }
//     }
//   }, [userdata, dispatch]);

//   //   useEffect(() => {
//   //     dispatch(accountVerificationThunk(userdata));
//   //   }, [userdata, dispatch]);
//   return (
//     <div className=" py-20  max-w-7xl mx-auto overflow-scroll">
//       <p className="text-2xl">This is a Verify User Page</p>
//     </div>
//   );
// };

// export default VerifyUser;
