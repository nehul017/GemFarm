import * as Yup from "yup";

export const managerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .trim()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email."
    ),
    farmIds: Yup.array().min(1, "Please assign at least one farm").required(),
});