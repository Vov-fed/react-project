import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { fetchAllCards, likeSomeCard } from "../services/userServices";

function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 24;

  const fetchCards = async () => {
    try {
      const response = await fetchAllCards()
      setCards(response); // Reverse the order of the cards
    } catch (error) {
      console.error("Error fetching cards:", error.response?.data || error.message);
      alert("An error occurred while fetching the cards.");
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
    alert("An error occurred while liking the card.");
  }
};

  useEffect(() => {
    fetchCards();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  return (
    <>
      <div className="main-wrapper">
        <h1 className="main-title">B-Card</h1>
        <h3 className="main-about">Find business clients simple, fast, and secure!</h3>
        {localStorage.getItem("token") ? (
          <div className="main-big-btn">
            <a href="#cards">
              To the cards <span className="arrow-down">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </a>
          </div>
        ) : (
          <div className="main-btns">
            <div className="main-big-btn"><a href="#cards">To the cards <i
            className="fa-solid fa-chevron-down"></i></a></div>
          </div>
        )}
      </div>
      {loading ? (
        <div className="loading-wrapper">
          <img className="loading" src="src/img/loading.png" alt="Loading" />
        </div>
      ) : currentCards.length > 0 ? (
        <div id="cards" className="cards">
          <h2 className="cards-title">Cards</h2>
          <div className="cards-container">
            {currentCards.map((card) => (
              <div key={card._id} className="card">
                <div className="card-img-wrapper">
                  <img className="card-img" src={card.image.url} alt={card.title} />
                  <div className="card-img-overlay">
                    <span className="card-category">{card.category || "Category"}</span>
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
    
  )}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="no-cards">No cards found.</p>
      )}
     <div className="pagination">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
      key={index + 1}
      onClick={async () => {
        await handlePageChange(index + 1);
        document.querySelector("#cards").scrollIntoView({ behavior: "smooth" });
      }}
      disabled={currentPage === index + 1}
    >
      <span>{index + 1}</span>
    </button>
  ))}
</div>
    </>
  );
}

export default Home;