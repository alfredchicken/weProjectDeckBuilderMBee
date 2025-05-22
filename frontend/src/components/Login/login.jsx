import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";

// Validation mit Yup
const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Please enter an username"),
  password: Yup.string().required("Please enter a password"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ name: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await login(values.name, values.password);
          toast.success("Log in successfully! Nice to see you!");
          navigate("/");
        } catch (error) {
          toast.error(error.message);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="login-form">
          <h2>Login</h2>
          <Field type="text" name="name" placeholder="Username" />
          <ErrorMessage name="name" component="div" style={{ color: "red" }} />

          <Field type="password" name="password" placeholder="Passwort" />
          <ErrorMessage name="password" component="div" style={{ color: "red" }} />

          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
