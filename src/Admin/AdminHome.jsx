import React from 'react';
import './AdminHome.css';

// Dummy data for the cards
const cards = [
  {
    title: "Create Event",
    description: "View and manage the admin profile details.",
    link: "/createevent"
  },
  {
    title: "Events Registration",
    description: "Register and manage upcoming events.",
    link: "/events-registration"
  },
  {
    title: "Users Details",
    description: "View and manage user details.",
    link: "/admin-user-records"
  },
  {
    title: "User Queries",
    description: "View and respond to user queries.",
    link: "/admin-user-querys"
  }
];

const AdminHome = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <a href={card.link} className="card-link">Go to {card.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
