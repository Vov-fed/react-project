import { useEffect, useState } from "react";
import { deleteCard, fetchAllCards } from "../services/userServices";

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteCardQuestion, setDeleteCardQuestion] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [timer, setTimer] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 15;


    
    const fetchCards = async () => {
        try {
            const response = await fetchAllCards();
            setCards(response);
        } catch (error) {
            console.log("Error fetching cards:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCards();
    }, []);
    
    useEffect(() => {
        if (deleteCardQuestion) {
            setTimer(3);
            
            const countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 0) {
                        setDeleteCardQuestion(false);
                        clearInterval(countdown);
                    }
                    return prev - 1;
                });
            }, 1000);
            
            return () => clearInterval(countdown);
        }
    }, [deleteCardQuestion]);
    
    const getBackgroundColor = (value) => {
        switch (value) {
            case 3:
                return "#007bff4d";
                case 2:
                    return "#007bff84";
                    case 1:
                        return "#007bffae";
                        case 0:
                            return "#007bff";
                            default:
                                return "#007bff4d";
                            }
                        };
                        
                        const filteredCards = cards.filter((card) =>
                            card.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    const handlePageChange = (pageNumber) => {
                        setCurrentPage(pageNumber);
                    }
                    const indexOfLastCard = currentPage * cardsPerPage;
                    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
                    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
                    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
                    return (
                        <div id="cards" className="cards-wrapper">
            {loading ? (
                <img
                className="loading"
                id="loading"
                src="https://images2.imgbox.com/f5/8b/N9P4UPmE_o.png"
                alt="Loading"
                />
            ) : filteredCards.length === 0 ? (
                <div className="cards-empty">
                    <p>No cards found.</p>
                </div>
            ) : (
                <div className="cards-container">
                    {currentCards.map((card) => (
                        <div key={card._id} className="card">
                            <div className="card-img-wrapper">
                                <img
                                    className="card-img"
                                    src={card.image.url}
                                    alt={card.title}
                                    />
                                <div className="card-img-overlay"></div>
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
                                <div className="card-date card-date-delete">
                                    <div className="card-created">
                                        <i className="fa-solid fa-calendar"></i>
                                        <span className="card-created">
                                            {card.createAt.slice(0, 10).replace(/-/g, ".")}
                                        </span>
                                    </div>
                                    <div
                                        className="card-delete"
                                        onClick={() => {
                                            setCardToDelete(card._id);
                                            setDeleteCardQuestion(true);
                                        }}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {deleteCardQuestion && (
                loadingDelete ? (
                    <div className="delete-card-question">
                        <div className="delete-card-question-wrapper">
                            <img
                                className="loading"
                                src="src/img/loading.png"
                                alt="Loading"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="delete-card-question">
                        <div className="delete-card-question-wrapper">
                            <div
                                className="delete-timer"
                                style={{
                                    backgroundColor: getBackgroundColor(timer),
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    display: "flex",
                                    marginBottom: "20px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    className="delete-timer-number"
                                    style={{
                                        fontSize: "20px",
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {timer}
                                </span>
                            </div>
                            <p>Are you sure you want to delete this card?</p>
                            <div className="delete-card-btns">
                                <button
                                    className="delete-card-btn"
                                    onClick={async () => {
                                        setLoadingDelete(true);
                                        await deleteCard(cardToDelete);
                                        setLoadingDelete(false);
                                        setDeleteCardQuestion(false);
                                        fetchCards();
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    className="cancel-delete-card-btn"
                                    onClick={() => setDeleteCardQuestion(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}
      <div className="pagination">
        {Array.from({ length:  totalPages}, (_, index) => (
          <button
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            key={index + 1}
            onClick={async () => {
              await handlePageChange(index + 1);
              document.querySelector("#cards").scrollIntoView({
                behavior: "smooth",
              });
            }}
            disabled={currentPage === index + 1}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
        </div>
    );
};

export default Cards;
