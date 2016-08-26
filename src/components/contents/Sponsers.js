import React, { PropTypes } from 'react';
import Sponser from './common/Sponser';
import {Element} from 'react-scroll';

const Sponsers = () => {
  return (
    <section className="sponsers">
      <Element name="sponsers">
        <h1>Our generous Sponsers</h1>
        <section className="sponser-imgs">
          <Sponser img="https://placekitten.com/g/100/100" />
          <Sponser img="https://placekitten.com/g/100/100" />
          <Sponser img="https://placekitten.com/g/100/100" />
          <Sponser img="https://placekitten.com/g/100/100" />
        </section>
      </Element>
    </section>
  );
};

export default Sponsers;
