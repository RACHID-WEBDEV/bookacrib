import * as yup from "yup";

export const LoginSchema = yup
  .object({
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 character long"),
    remember: yup.boolean(),
  })
  .required();

export const ForgetPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
  })
  .required();

export const SignUpSchema = yup
  .object({
    firstname: yup
      .string()
      .required("Firstname is required")
      .min(3, "Minimum 3 characters length"),
    lastname: yup
      .string()
      .required("Lastname is required")
      .min(3, "Minimum 3 characters length"),
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "Must be at least 8 characters."),
    acceptTerms: yup
      .boolean()
      .oneOf([true], "Must Accept Terms and Conditions"),
  })
  .required();

export const ResetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .required("Must contain one special character")
      .min(8, "Must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password's not match"),
  })
  .required();

export const AssignRoleSchema = yup
  .object({
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
  })
  .required();

export const PickUpCenterSchema = yup
  .object({
    center_name: yup.string().required("Center Name is required"),
    address: yup.string().required("Pickup center address is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^[0-9]{10,15}$/,
        "Phone number must be between 10 to 15 digits"
      ),
  })
  .required();
