import React, { PropTypes } from 'react';

const Speaker = ({img, name}) => {
  return (
    <section className="col-four">
      <article>
        <img src={img} alt={`${name} the speaker`} /><h2>{name}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </article>
    </section>
  );
};

export default Speaker;
