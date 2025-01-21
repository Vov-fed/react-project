import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { use } from "react";
import '../css/login.css'

const Login = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(9, "Password must be at least 9 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://cardsservice.onrender.com/users/login",
          { email: values.email, password: values.password }
        );
        localStorage.setItem("token", response.data);
        navigate("/success:login");
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        alert("Invalid email or password. Please try again.");
      }
    },
  });
  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <h2 className="login-title">Login</h2>
        <div className="login-input-wrapper">
          <input
            className={`login-input ${
              formik.touched.email && formik.errors.email ? "login-input-error" : ""
            }`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="login-error">{formik.errors.email}</div>
          )}
        </div>
        <div className="login-input-wrapper">
          <input
            className={`login-input ${
              formik.touched.password && formik.errors.password
                ? "login-input-error"
                : ""
            }`}
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="login-error">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="login-submit-btn"
          disabled={!(formik.isValid && formik.dirty)||formik.isSubmitting}
        >
          Login
        </button>
        <p className="login-extra">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;