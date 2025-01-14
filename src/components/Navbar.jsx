import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchAllCards } from "../services/userServices";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [cards, setCards] = useState([]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchCards = async () => {
    try {
      const response = await fetchAllCards();
      setCards(response);
    } catch (error) {
      console.error("Error fetching cards:", error.response?.data || error.message);
      alert("An error occurred while fetching the cards.");
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };




  const searchCards = (search) => {
    if(search === ""){
      return
    } else {
      const filteredCards = cards.filter((card) => {
        return card.name.toLowerCase().includes(search.toLowerCase());
      }
      );
      setCards(filteredCards);
      filteredCards.forEach((card) => {
        console.log(card.key);
      });
    }
  };

  useEffect(() => {
  if(localStorage.getItem("nightMode") === "true"){
    document.body.classList.add("night-mode");
    setNightMode(true);
  }
  }, []);
  useEffect(() => {
    if(nightMode){
      document.body.classList.add("night-mode");
      localStorage.setItem("nightMode", nightMode);
    } else {
      localStorage.setItem("nightMode", nightMode);
      document.body.classList.remove("night-mode");
    }
  }
  , [nightMode]);

  return (
    <header className="header">
      <ul className={`header-nav ${isOpen ? "open" : ""}`}>
        <li className="header-nav-item">
          <Link to="/" className="header-logo-link" onClick={closeMenu}>
            <img className="header-logo" src="https://raw.githubusercontent.com/Vov-fed/react-project/ae0a929da416e1b272abcf2f9bf1801e4615fe15/public/logo.svg?token=BBCAAOUF7GHDWVKW5XVUWRLHQ3MGA" alt="logo" />
          </Link>
        </li>
        <li className="header-nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li className="header-nav-item">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            About
          </NavLink>
        </li>
        <li className="header-nav-item">
          <NavLink
            to={localStorage.getItem("token") ? "/profile" : "/login"}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            {localStorage.getItem("token") ? "Profile" : "Login"}
          </NavLink>
        </li>
        {
          !localStorage.getItem("token") &&
        <li className="header-nav-item">
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Signup
          </NavLink>
        </li>}
        <li className="header-nav-item">
          {
            localStorage.getItem("token") &&
            jwtDecode(localStorage.getItem("token")).isBusiness &&
            <NavLink
            to="/newCard"
            className={({ isActive }) =>
              isActive ? "active nav-new" : "nav-new"
            }
            onClick={closeMenu}
          >
            <i className="fa-solid fa-plus"></i>New card
          </NavLink>}
        </li>
        <li
        className="header-nav-item night-mode-btn"
        onClick={()=>{setNightMode(!nightMode)}}
        >
        <i className={`${!nightMode ? "fa-solid fa-moon forNight" : "fa-solid fa-sun forDay"}
        `}></i>
        </li>
        <li className="header-nav-item">
          <input type="text" 
          className="header-search"
          placeholder="Search"
          onChange={(e)=>{searchCards(e.target.value)}}
          />
        </li>
      </ul>
      <div className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </div>
    </header>
  );
}

export default Navbar;