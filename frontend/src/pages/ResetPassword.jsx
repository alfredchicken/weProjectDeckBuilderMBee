import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../api/api";
import "./ResetPassword.css";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Please enter a password"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={ResetPasswordSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await resetPassword(token, values.password);
          toast.success("Password updated successfully");
          navigate("/login");
        } catch (error) {
          toast.error(error.message);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="reset-form">
          <h2>Reset Password</h2>
          <Field type="password" name="password" placeholder="New Password" />
          <ErrorMessage
            name="password"
            component="div"
            style={{
              color: "white",
              backgroundColor: "#ff512f",
              borderRadius: "8px",
              paddingLeft: "8px",
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Reset Password
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
