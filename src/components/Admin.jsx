import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchAllLikedCards, fetchAllMyCards, fetchMe } from "../services/userServices";
import "../css/profile.css";

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  if(localStorage.getItem("token") === null){
    console.log("No token found");
    window.location.href = "/login"; 
  }
  const fetchUser = async () => {
    try {
    const response = await fetchMe();
    setUser(response);
    } catch (error) {
    console.log("Error fetching user:", error.response?.data || error.message);
    } finally {
    setLoading(false); 
    }
};

    useEffect(() => {
    fetchUser();
    }
    , []);

  return (
    <div id="profile" className="container">
      {loading ? (
        <img className="loading" id="loading"
        src="https://images2.imgbox.com/f5/8b/N9P4UPmE_o.png"
        alt="Loading" />
      ) : user ? (
        <div className="profile">
          <div className="profile-wrapper">
          <div className="profile-top">
  <div className="profile-header">
    <div className="profile-image-container">
      <img className="profile-image" src={user.image?.url} alt="User Profile" />
      <button className="profile-image-edit-btn" onClick={() => navigate("/editProfile")}>
        <i className="fa-solid fa-camera"></i> Edit
      </button>
    </div>
    <div className="profile-info">
      <h1 className="profile-name">{user.name.first} {user.name.last}</h1>
      <p className="profile-email">{user.email}</p>
      <div className="profile-actions">
        <button className="edit-profile-btn" onClick={() => {navigate("/cards")}}>
          <i className="fa-solid fa-address-card"></i> Edit cards
        </button>
        <button className="logout-btn" onClick={() => navigate("/users")}>
          <i className="fa-solid fa-users"></i> Edit Users
        </button>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Admin;