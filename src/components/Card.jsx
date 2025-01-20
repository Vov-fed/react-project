import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCardById, likeSomeCard } from "../services/userServices";
import { jwtDecode } from "jwt-decode";
import '../css/Card.css';

const Card = () => {
  const cardId = window.location.pathname.split("/")[2];
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const likeCard = async (id) => {
    try {
        await likeSomeCard(id);
        fetchCard();
        } catch (error) {
        console.error("Error liking card:", error.response?.data || error.message);
        alert("An error occurred while liking the card.");
        }
    }


  const fetchCard = async () => {
    try {
      const response = await getCardById(cardId);
      setCard(response);
    } catch (error) {
      console.error("Error fetching card:", error.response?.data || error.message);
      alert("An error occurred while fetching the card.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  return (
    <div className="card-page">
      {loading ? (
        <div className="card-loading">Loading...</div>
      ) : (
        <div className="card-container">
          <div className="card-image-wrapper">
            <img
              className="card-image"
              src={card.image?.url || "https://via.placeholder.com/300"}
              alt={card.image?.alt || "Card image"}
            />
          </div>
          <div className="card-content">
            <h1 className="card-title">{card.title}</h1>
            <h2 className="card-subtitle">{card.subtitle}</h2>
            <p className="card-description">{card.description}</p>
            <div className="card-contact">
              <p>
                <strong>Phone:</strong> {card.phone}
              </p>
              <p>
                <strong>Email:</strong> {card.email}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={card.web} target="_blank" rel="noopener noreferrer">
                  {card.web}
                </a>
              </p>
            </div>
            <div className="card-address">
              <p>
                <strong>Address:</strong> {card.address?.street} {card.address?.houseNumber},{" "}
                {card.address?.city}, {card.address?.state} {card.address?.zip}, {card.address?.country}
              </p>
            </div>
            <div className="card-meta">
              <p>
                <strong>Business Number:</strong> {card.bizNumber}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(card.createAt).toLocaleDateString()}
              </p>
            </div>
            <div className="card-actions">
                <i
                className={`${card.likes?.includes(jwtDecode(localStorage.getItem("token"))._id) ? "fas" : "far"} fa-heart like-icon`}
                onClick={() => {
                    likeCard(card._id);
                }}
                ></i>
              <button className="back-button" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
