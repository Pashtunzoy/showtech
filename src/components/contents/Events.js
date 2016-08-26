import React, { PropTypes } from 'react';
import Event from './common/Event';
import {Element} from 'react-scroll';

const Events = ({onClick, cities}) => {
  return (
    <div className="events-section" >
      <Element name="events">
        <h1>Events</h1>
        {cities.map((e, i) => <Event key={i} onClick={onClick} date={e.date} city={e.city} />)}
      </Element>
    </div>
  );
};

export default Events;
