import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe, upadateUser } from "../services/userServices";
import { toast } from "react-toastify";
import { useFormik, getIn } from "formik";
import * as Yup from "yup";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const success = localStorage.getItem("success");
  // Display success message if available
  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        localStorage.removeItem("success");
      }, 5000);
    }
  }, [success]);

  // Fetch user data
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetchMe();
      setUser(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      toast.error("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/");
    window.location.reload();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: {
        first: user?.name.first || "",
        middle:  user?.name.middle || "",
        last: user?.name.last || "",
      },
      phone: user?.phone || "",
      image: {
        url: user?.image?.url || "",
        alt: user?.image?.alt || "",
      },
      address: {
        state: user?.address.state || "",
        country: user?.address.country || "",
        city: user?.address.city || "",
        street: user?.address.street || "",
        houseNumber: user?.address.houseNumber || "",
        zip: user?.address.zip || "",
      }
    },
    validationSchema: Yup.object({
      name: Yup.object({
        first: Yup.string()
          .required("First name is required")
          .min(3, "First name must be at least 3 characters"),
        middle: Yup.string(),
        last: Yup.string().required("Last name is required"),
      }),
      phone: Yup.string()
        .matches(
          /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}$/,
          "Phone must be a standard Israeli phone number"
        )
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(9, "Password must be at least 9 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
          "Password must contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-"
        )
        .required("Password is required"),
      image: Yup.object({
        url: Yup.string()
          .url("Image URL must be a valid URL")
          .required("Image URL is required"),
      }),
      address: Yup.object({
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        street: Yup.string().required("Street is required"),
        houseNumber: Yup.number()
          .typeError("Please enter a valid house number")
          .required("House number is required"),
        zip: Yup.number()
          .typeError("Please enter a valid ZIP code")
          .required("ZIP code is required"),
      }),
    }),
    onSubmit: async (values) => {
      try {
        await upadateUser(values);
        navigate("/success:editProfile");
        window.location.reload();
      } catch {
        toast.error("Error updating profile");
      }
    },
  });

  // Input fields configuration
  const inputValues = [
    { name: "name.first", placeholder: "First Name", type: "text" },
    { name: "name.middle", placeholder: "Middle Name", type: "text" },
    { name: "name.last", placeholder: "Last Name", type: "text" },
    { name: "phone", placeholder: "Phone", type: "text" },
    { name: "image.url", placeholder: "Image URL", type: "text" },
    { name: "image.alt", placeholder: "Image Alt", type: "text" },
    { name: "address.state", placeholder: "State", type: "text" },
    { name: "address.country", placeholder: "Country", type: "text" },
    { name: "address.city", placeholder: "City", type: "text" },
    { name: "address.street", placeholder: "Street", type: "text" },
    { name: "address.houseNumber", placeholder: "House Number", type: "text" },
    { name: "address.zip", placeholder: "ZIP Code", type: "text" },
  ];
  
  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect if no token
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
  }

    return (
    <div id="profile" className="container">
    {loading ? (
        <img className="loading" src="src/img/loading.png" alt="Loading" />
    ) : user ? (
        <div className="profile">
        <div className="profile-top">
            <div className="profile-header">
            <div className="profile-image-container">
                <img
                className="profile-image"
                src={user.image?.url}
                alt="User Profile"
                />
                <button
                className="profile-image-edit-btn"
                onClick={() => navigate("/editProfile")}
                >
                <i className="fa-solid fa-camera"></i> Edit
                </button>
            </div>
            <div className="profile-info">
                <h1 className="profile-name">
                {user.name.first} {user.name.last}
                </h1>
                <p className="profile-email">{user.email}</p>
                <div className="profile-actions">
                <button className="logout-btn" onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </button>
                </div>
            </div>
            </div>
        </div>
        <div className="profile-bottom">
            <h2 className="profile-bottom-title">Edit your profile</h2>
            <form
            className="profile-edit-form"
            onSubmit={formik.handleSubmit}
            >
            {inputValues.map((input) => (
                <div className="profile-edit-input" key={input.name}>
                <label htmlFor={input.name}>{input.placeholder}</label>
                <input
                    type={input.type}
                    id={input.name}
                    value={getIn(formik.values, input.name)}
                    onChange={formik.handleChange}
                />
                {getIn(formik.touched, input.name) &&
                getIn(formik.errors, input.name) ? (
                    <div className="error">
                    {getIn(formik.errors, input.name)}
                    </div>
                ) : null}
                </div>
            ))}
            <div className="edit-submit">
            <button type="submit" className="edit-submit-btn"
            disabled={!formik.dirty || !formik.isValid}>
                Save Changes
            </button>
            <button
            className="edit-cancel-btn"
            onClick={ 
              () => {
                window.confirm('Are you sure you want to cancel all the changes?') &&
                navigate('/profile')}}>Cancel</button>
              </div>
            </form>
        </div>
        </div>
    ) : (
        <p>No user data found.</p>
    )}
    </div>
);
};

export default EditProfile;