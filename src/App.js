import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import PopUpSearch from './components/PopUpSearch';
import Counter from './components/Counter';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [counter, setCounter] = useState(0);
  const [restore, setRestore] = useState(1);

  useEffect(() => {
    fetch('/api/tickets').then((res) => res.json()).then((res) => {
      setTickets(res);
    });
  }, []);

  const renderTickets = () => tickets.map((ticket) => (
    <Ticket
      key={ticket.id}
      restore={restore}
      title={ticket.title}
      content={ticket.content}
      email={ticket.userEmail}
      increaseCounter={() => setCounter((number) => number + 1)}
      time={new Date(ticket.creationTime).toISOString().slice(0, -5).replace('T', ' ')}
      labels={ticket.labels}
    />
  ));

  const search = (input) => {
    const url = `/api/tickets?searchText=${encodeURIComponent(input)}`;
    fetch(url).then((res) => res.json()).then((res) => setTickets(res));
  };
  const restoreTickets = () => {
    setCounter(0);
    setRestore((res) => res * -1);
  };

  return (
    <main className="main">
      <Counter count={counter} restore={restoreTickets} />
      {renderTickets()}
      <PopUpSearch search={(input) => search(input)} />
    </main>
  );
}

export default App;
