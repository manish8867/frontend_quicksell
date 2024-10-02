import React from 'react';

const Card = ({ ticket, userName }) => {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Assigned to: {userName}</p>
    </div>
  );
};

export default Card;
