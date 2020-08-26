import React from 'react';
import './counter.css';

function Counter(props) {
  const hiddens = props.count > 0
    ? (
      <div>
        There
        {props.count === 1 ? 'is' : 'are'}
        {' '}
        <span id="hideTicketsCounter">{props.count}</span>
        {' '}
        hidden tickets
        <button id="restoreHideTickets" onClick={props.restore}>restore</button>
      </div>
    )
    : <div />;
  return (
    <div className="counter">

      {hiddens}
    </div>
  );
}

export default Counter;
