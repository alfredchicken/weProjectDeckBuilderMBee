import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../api/api.js";
import { toast } from "react-toastify";
import "./Register.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Please enter an username"),
  password: Yup.string().min(6, "Password needs to be at least 6 characters").required("Please enter a password"),
});

const Register = () => {
  return (
    <Formik
      initialValues={{ name: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await registerUser(values.name, values.password);
          toast.success("Register successfully!");
          resetForm();
        } catch (error) {
          if (error.message.includes("existiert bereits")) {
            toast.error("Username already exists!");
          } else {
            toast.error("Registration failed!");
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

          <Field type="password" name="password" placeholder="Passwort" />
          <ErrorMessage name="password" component="div" style={{ color: "red" }} />

          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
