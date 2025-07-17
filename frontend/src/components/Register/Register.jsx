import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../api/api.js";
import { toast } from "react-toastify";
import ReCaptcha from "react-google-recaptcha";
import "./Register.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a username")
    .matches(/^[^<>]*$/, "Username must not contain < or >"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter an email address")
    .matches(/^[^<>]*$/, "E-Mail must not contain < or >"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/\d/, "At least one number")
    .required("Please enter a password"),
});

const Register = () => {
  const recaptchaRef = useRef();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const recaptchaValue = recaptchaRef.current.getValue();
        if (!recaptchaValue) {
          toast.error("Please complete the reCAPTCHA!");
          setSubmitting(false);
          return;
        }

        try {
          await registerUser(values.name, values.email, values.password, recaptchaValue);
          toast.success("Register successfully!");
          resetForm();
          recaptchaRef.current.reset();
        } catch (error) {
          if (error.message.includes("existiert bereits") || error.message.includes("already exists")) {
            toast.error("Username or E-Mail already exists!");
          } else {
            toast.error(error.message || "Registration failed!");
          }
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="register-form">
          <h2>Register</h2>
          <Field type="text" name="name" placeholder="Username" />
          <ErrorMessage name="name" component="div" style={{ color: "red" }} />

          <Field type="email" name="email" placeholder="E-Mail" />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" style={{ color: "red" }} />

          <ReCaptcha sitekey="6LcDnVorAAAAAH1HhlCzOd1hwB0OnJ7s2CwkOrv1" ref={recaptchaRef} />

          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
