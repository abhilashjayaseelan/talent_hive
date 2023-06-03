import * as yup from "yup";

export const userRegisterValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]*$/, "Enter a valid name"),
  email: yup.string().required("Email is required").email("Invalid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match"),
});

export const userLoginValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

