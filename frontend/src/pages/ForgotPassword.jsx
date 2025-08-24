import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { forgotPassword } from "../api/api";
import "./ForgotPassword.css";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
});

const ForgotPassword = () => (
  <>
  <div className="forgot-container">
  <Formik
    initialValues={{ email: "" }}
    validationSchema={ForgotPasswordSchema}
    onSubmit={async (values, { setSubmitting }) => {
      try {
        await forgotPassword(values.email);
        toast.success("Password reset email sent");
      } catch (error) {
        toast.error(error.message);
      }
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form className="forgot-form">
        <h2>Forgot Password</h2>
        <Field type="email" name="email" placeholder="Email" />
        <ErrorMessage
          name="email"
          component="div"
          style={{
            color: "white",
            backgroundColor: "#ff512f",
            borderRadius: "8px",
            paddingLeft: "8px",
          }}
        />
        <button type="submit" disabled={isSubmitting}>
          Send Reset Link
        </button>
      </Form>
    )}
  </Formik>
  </div>
</>
);

export default ForgotPassword;