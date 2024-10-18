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
    first_name: yup
      .string()
      .required("Firstname is required")
      .min(3, "Minimum 3 characters length"),
    last_name: yup
      .string()
      .required("Lastname is required")
      .min(3, "Minimum 3 characters length"),
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^[0-9]{10,15}$/,
        "Phone number must be between 10 to 15 digits"
      ),
    password: yup
      .string()
      .required("password is required")
      .min(8, "Must be at least 8 characters."),
    password_confirmation: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password's not match"),
    // acceptTerms: yup
    //   .boolean()
    //   .oneOf([true], "Must Accept Terms and Conditions"),
  })
  .required();

export const ResetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .required("Must contain one special character")
      .min(8, "Must be at least 8 characters"),
    password_confirmation: yup
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

export const CreateCompanySchema = yup
  .object({
    name: yup.string().required("Company Name is required"),

    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^[0-9]{10,15}$/,
        "Phone number must be between 10 to 15 digits"
      ),
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
    address: yup.string().required("Property address is required"),
    next_of_kin_name: yup.string().required("Next of kin name is required"),
  })
  .required();

export const FeatureSchema = yup
  .object({
    name: yup.string().required("Feature Name is required"),
    price: yup.string().required("Feature Price is required"),
  })
  .required();

export const RoomSchema = yup
  .object({
    name: yup.string().required("Feature Name is required"),
  })
  .required();
