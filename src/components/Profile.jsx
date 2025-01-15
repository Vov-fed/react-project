import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchAllCards, fetchAllLikedCards, fetchAllMyCards, fetchMe, likeSomeCard } from "../services/userServices";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedCards, setLikedCards] = useState([]);
  const cardsPerPage = 25;
  const [myCards, setMyCards] = useState([]);
  const navigate = useNavigate();

  let success = localStorage.getItem("success") || null;
  useEffect(() => {
    if (success) {
      toast.success('oh yeah');
      setInterval(() => {
        localStorage.removeItem("success");
      }, 5000);
    }
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
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

  const fetchCards = async () => {
    try {
      const response = await fetchAllCards();
      setCards(response);
    } catch (error) {
      console.error("Error fetching cards:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const likeCard = async (id) => {
    try {
      await likeSomeCard(id);
      fetchCards();
    } catch (error) {
      console.error("Error liking card:", error.response?.data || error.message);
    }
  };

  const fetchLikedCards = async () => {
    try {
      const response = await fetchAllLikedCards();
      let likedCards = response;
      if (likedCards.length >= 4) {
        likedCards = likedCards.slice(-4);
      }
      setLikedCards(likedCards);
    } catch (error) {
      console.error("Error fetching cards:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyCards = async () => {
    try {
      const response = await fetchAllMyCards();
      setMyCards(response);
    } catch (error) {
      console.error("Error fetching my cards:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (jwtDecode(localStorage.getItem("token")).isBusiness) {
      fetchMyCards();
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchLikedCards();
    fetchCards();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/");
    window.location.reload();
  };

  return (
    <div id="profile" className="container">
      {loading ? (
        <img className="loading" id="loading" src="src/img/loading.png" alt="Loading" />
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
        <button className="edit-profile-btn" onClick={() => navigate("/editProfile")}>
          <i className="fa-solid fa-pen"></i> Edit Profile
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  </div>
</div>
            {jwtDecode(localStorage.getItem("token")).isBusiness === true ? (
              <div className="profile-bottom">
                <h2 className="profile-bottom-title">Your cards</h2>
                <div className="profile-bottom-cards">
                  {myCards.map((card) => (
                    <div key={card._id} className="card profile-card-bottom">
                                      <div className="card-img-wrapper">
                  <img className="card-img" src={card.image.url} alt={card.title} />
                  <div className="card-img-overlay">
                  </div>
                </div>
                <div className="card-content">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-sub">{card.subtitle}</p>
                <div className="card-location">
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="card-country">
                    {card.address.country}, {card.address.city}
                  </span>
                </div>
                <div className="card-date">
                  <i className="fa-solid fa-calendar"></i>
                  <span className="card-created">{card.createAt.slice(0, 10).replace(/-/g, ".")}</span>
                </div>
              </div>
              <div className="card-btn-wrapper">
                <a href={card.web} className="card-btn primary-btn">
                Visit Website
                </a>
                {localStorage.getItem("token") && (
                <div className="card-like">
                <i
                  className={
                              card.likes.includes(jwtDecode(localStorage.getItem("token"))._id)
                              ? "fa-solid fa-heart liked"
                              : "fa-regular fa-heart"
                              }
                  onClick={() => likeCard(card._id)}
                ></i>
                <span className="like-count">{card.likes.length}</span>
    </div>
  )}
  <div className="card-edit">
    <Link to={`/editCard`}
    onClick={() => localStorage.setItem("cardId", card._id)}>
      <i className="fa-solid fa-pen"></i>
    </Link>
  </div>
  </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="profile-bottom">
              <h2 className="profile-bottom-title">Liked cards</h2>
              <div className="profile-bottom-cards">
                {likedCards.map((card) => (
                  <div key={card._id} className="card profile-card-bottom">
                <div className="card-img-wrapper">
                  <img className="card-img" src={card.image.url} alt={card.title} />
                  <div className="card-img-overlay">
                  </div>
                </div>
                <div className="card-content">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-sub">{card.subtitle}</p>
                <div className="card-location">
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="card-country">
                    {card.address.country}, {card.address.city}
                  </span>
                </div>
                <div className="card-date">
                  <i className="fa-solid fa-calendar"></i>
                  <span className="card-created">{card.createdAt.slice(0, 10).replace(/-/g, ".")}</span>
                </div>
              </div>
              <div className="card-btn-wrapper">
                <a href={card.web} className="card-btn primary-btn">
                Visit Website
                </a>
                {localStorage.getItem("token") && (
                <div className="card-like">
                <i
                  className={
                              card.likes.includes(jwtDecode(localStorage.getItem("token"))._id)
                              ? "fa-solid fa-heart liked"
                              : "fa-regular fa-heart"
                              }
                  onClick={() => likeCard(card._id)}
                ></i>
                <span className="like-count">{card.likes.length}</span>
    </div>
    
  )}</div>
                  </div>
                ))}
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

export default Profile;