import * as yup from "yup";

export const PropertySchema = yup
  .object({
    name: yup.string().required(" Name is required"),

    address: yup.string().required(" Address is required"),
    price: yup.string().required("Price is required"),
    description: yup.string().required("Description is required"),
  })
  .required();
