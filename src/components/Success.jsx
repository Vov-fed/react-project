import { Link } from "react-router-dom";
import '../css/success.css';

function Success() {
  return (
  <div className="success-wrapper">
    <div className="success-element">
      <h1 className="success-header">Success!</h1>
      {window.location.pathname === "/success:login" && (
        <div className="success-message">Login successful</div>
      )}
      {window.location.pathname === "/success:register" && (
        <div className="success-message">
          You are now registered!
          <br />
          Please login to continue.
        </div>
      )}
      {window.location.pathname === "/success:card" && (
        <div className="success-message">Your card created successfully!</div>
      )}
      {window.location.pathname === "/success:editCard" && (
        <div className="success-message">Your card is now updated!</div>
      )}
      {window.location.pathname === "/success:editProfile" && (
        <div className="success-message">Your profile is now updated!</div>
      )}
      {window.location.pathname === "/success:deleteCard" && (
        <div className="success-message">Your card is now deleted!</div>
      )}
      {window.location.pathname === "/success:deleteProfile" && (
        <div className="success-message">Your profile is now deleted!</div>
      )}
      <div className="success-link-wrapper">
        <Link to="/" className="success-link">
        <i className="fa-solid fa-home"></i>
        </Link>
        <Link to="/profile" className="success-link">
        <i className="fa-solid fa-user"></i>
        </Link>
      </div>
    </div>
  </div>
  );
}

export default Success;