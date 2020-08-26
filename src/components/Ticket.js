import React, { useState, useEffect } from 'react';
import './Ticket.css';

function Ticket(prop) {
  const {
    increaseCounter,
    restore,
    labels,
    title,
    content,
    email,
    time,
  } = prop;
  const [klass, setKlass] = useState('ticket');
  let labs;
  if (labels) {
    labs = labels.map((label) => (
      <span className="label">{label}</span>
    ));
  }
  useEffect(() => setKlass('ticket'), [restore]);

  const hide = () => {
    setKlass('hiddenTicket');
    increaseCounter();
  };

  return (
    <div className={klass}>
      <button type="button" className="hideTicketButton" onClick={hide}>Hide</button>
      <h1>{title}</h1>
      <div className="content">{content}</div>
      <div className="footer">
        <div className="info">
          <span>{email}</span>
          {' '}
          |
          <span>{time}</span>
        </div>
        <div className="labels">{labs}</div>
      </div>

    </div>
  );
}

export default Ticket;
