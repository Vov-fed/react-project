import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
      isBusiness: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(9, "Password must be at least 9 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/, "Password must contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-")
        .required("Password is required"),
      name: Yup.object({
        first: Yup.string()
          .required("First name is required")
          .min(3, "First name must be at least 3 characters"),
        middle: Yup.string(),
        last: Yup.string().required("Last name is required"),
      }),
      phone: Yup.string()
        .matches(/^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}$/, "Phone must be a standard Israeli phone number")
        .required("Phone number is required"),
      image: Yup.object({
        url: Yup.string()
          .url("Image URL must be a standard URL")
          .required("Image URL is required"),
      }),
      address: Yup.object({
        zip: Yup.number().typeError("Please enter a number").required("ZIP code is required"),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        street: Yup.string().required("Street is required"),
        houseNumber: Yup.number().typeError("Please enter a number").required("House number is required"),
      }),
      isBusiness: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://cardsservice.onrender.com/users",
          values
        );
        navigate("/success:register");
      } catch (error) {
        console.log(error)
        alert("Registration failed. Please try again.");
      }
    },
  });

  const inputs = [
    {
      name: "name.first",
      placeholder: "First Name",
      type: "text",
    },
    {
      name: "name.middle",
      placeholder: "Middle Name",
      type: "text",
    },
    {
      name: "name.last",
      placeholder: "Last Name",
      type: "text",
    },
    {
      name: "phone",
      placeholder: "Phone",
      type: "text",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
    },
    {
      name: "image.url",
      placeholder: "Image URL",
      type: "text",
    },
    ...Object.keys(formik.values.address).map((key) => ({
      name: `address.${key}`,
      placeholder: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
      type: "text",
    })),
    {
      name: "isBusiness",
      placeholder: "Is Business",
      type: "checkbox",
    },
  ];

  const currentInput = inputs[step];
  const currentValue = currentInput.name
    .split(".")
    .reduce((obj, key) => obj?.[key], formik.values);
  const currentError = currentInput.name
    .split(".")
    .reduce((obj, key) => obj?.[key], formik.errors);

  const handleNext = () => {
    if (step < inputs.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={formik.handleSubmit}>
        <h2 className="register-title">Sign Up</h2>
        {inputs.map((input, index) => (
          index === step && (
            <div key={input.name} className="register-input-wrapper">
              <input
                className={`register-input ${
                  currentError ? "register-input-error" : ""
                }`}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={formik.handleChange}
                value={input.type === "checkbox" ? undefined : currentValue || ""}
                checked={input.type === "checkbox" ? currentValue : false}
              />
              {currentError && <div className="register-error">{currentError}</div>}
            </div>
          )
        ))}
        <div className="register-buttons">
          {step > 0 && (
            <button
              type="button"
              className="register-button-back"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {step < inputs.length - 1 && (
            <button
              type="button"
              className="register-button-next"
              onClick={handleNext}
              disabled={!!currentError || currentValue === ""}
            >
              Next
            </button>
          )}
          {step === inputs.length - 1 && (
            <button type="submit" className="register-button-submit">
              Sign Up!
            </button>
          )}
        </div>
        <p className="register-login-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;