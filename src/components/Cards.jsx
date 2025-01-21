import { useEffect, useState } from "react";
import { deleteCard, fetchAllCards } from "../services/userServices";

    const Cards = () => {
        const [cards, setCards] = useState([]);
        const [loading, setLoading] = useState(true);
        const [deleteCardQuestion, setDeleteCardQuestion] = useState(false);
        const [cardToDelete, setCardToDelete] = useState(null);
        const [loadingDelete, setLoadingDelete] = useState(false);
        const [searchTerm, setSearchTerm] = useState("");

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
                setTimeout(() => {
                    setDeleteCardQuestion(false);
                }, 4000);
                setTimeout(() => {
                    document.querySelector('.delete-timer-number').innerText = ' 2 ';
                    document.querySelector('.delete-timer-number').style.backgroundColor = '#007bffae';
                }, 1000);
                setTimeout(() => {
                    document.querySelector('.delete-timer-number').innerText = ' 1 ';
                    document.querySelector('.delete-timer-number').style.backgroundColor = '#007bff84';
                }, 2000);
                setTimeout(() => {
                    document.querySelector('.delete-timer-number').innerText = ' 0 ';
                    document.querySelector('.delete-timer-number').style.backgroundColor = '#007bff4d';
                }, 3000);
            }
        }, [deleteCardQuestion]);

        const filteredCards = cards.filter(card =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div id="cards" className="container">
                <input
                    type="text"
                    placeholder="Search cards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                {loading ? (
                    <img className="loading" id="loading"
                        src="https://images2.imgbox.com/f5/8b/N9P4UPmE_o.png"
                        alt="Loading" />
                ) : filteredCards.length === 0 ? (
                    <div className="cards-empty">
                        <p>No cards found.</p>
                    </div>
                ) : (
                    <div className="cards-container">
                        {filteredCards.map((card) => (
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
                                        <div className="card-delete" onClick={() => {
                                            setCardToDelete(card._id);
                                            setDeleteCardQuestion(true);
                                        }}>
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
                    ) :
                        (<div className="delete-card-question">
                            <div className="delete-card-question-wrapper">
                                <div className="delete-timer">
                                    <span className="delete-timer-number"> 3 </span>
                                </div>
                                <p>Are you sure you want to delete this card?</p>
                                <div className="delete-card-btns">
                                    <button className="delete-card-btn" onClick={async () => {
                                        setLoadingDelete(true);
                                        const response = await deleteCard(cardToDelete);
                                        setLoadingDelete(false);
                                        setDeleteCardQuestion(false);
                                        fetchCards();
                                    }}>
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
                        </div>)
                )}
            </div>
        );
    };
    export default Cards;