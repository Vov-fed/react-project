import React from "react";

function About() {
  return (
    <div className="about-wrapper">
      <div className="about-header">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          We aim to make finding and connecting with business clients simple, fast, and secure.
        </p>
      </div>

      <div className="about-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-text">
          At B-Card, we strive to empower businesses by providing an efficient platform to showcase
          their offerings and connect with potential clients. Our mission is to create opportunities
          for businesses of all sizes to thrive in today's competitive market.
        </p>
      </div>

      <div className="about-section">
        <h2 className="section-title">Our Values</h2>
        <ul className="about-list">
          <li>Innovation: Constantly improving our platform to deliver the best experience.</li>
          <li>Transparency: Ensuring honesty and integrity in every interaction.</li>
          <li>Community: Building a network where businesses support one another.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="section-title">Meet the Team</h2>
        <div className="team-container">
          <div className="team-member">
            <img
              className="team-photo"
              src="public/profile.jpeg"
              alt="Team Member 1"
            />
            <h3 className="team-name">Vladimir Fedoruk</h3>
            <p className="team-role">Founder & CEO</p>
          </div>
          <div className="team-member">
            <img
              className="team-photo"
              src="public/tima.jpg"
              alt="Team Member 2"
            />
            <h3 className="team-name">Tima Fedoruk</h3>
            <p className="team-role">Marketing Head</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;