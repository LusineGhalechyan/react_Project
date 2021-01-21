import * as Yup from "yup";

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const form = Yup.object().shape({
  name: Yup.string()
    .notRequired("Name is not required")
    .min(1, "Name is not required"),
  email: Yup.string()
    .required("E-mail address is required")
    .test("email-test", "Please write a valid email address", (email) =>
      emailRegExp.test(email)
    ),
  message: Yup.string()
    .min(10, "At least 10 characters")
    .required("Message is required"),
});

export default form;
