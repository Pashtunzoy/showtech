import React, { PropTypes } from 'react';
import Speaker from './common/Speaker';
import {Element} from 'react-scroll';

const Speakers = (props) => {
  return (
    <section className="speakers">
      <Element name="speakers">
        <h1>Awesome Speakers</h1>
        <Speaker img="http://placekitten.com/g/200/200" name="Azad Wali" />
        <Speaker img="http://placekitten.com/g/200/200" name="Ismat" />
        <Speaker img="http://placekitten.com/g/200/200" name="Naimat" />
        <Speaker img="http://placekitten.com/g/200/200" name="Qudrat" />
      </Element>
    </section>
  );
};

export default Speakers;
