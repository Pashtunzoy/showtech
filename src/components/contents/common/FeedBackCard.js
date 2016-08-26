import React, { PropTypes } from 'react';

const FeedBackCard = ({img, name, occupation}) => {
  return (
    <section className="col-four">
      <article>
        <p>Lorem ipsum dolor sit amet,
        consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        </p>
        <img src={img} alt={`feed back by ${name}`} /> <h5>{name} -- {occupation}</h5>
      </article>
    </section>
  );
};

export default FeedBackCard;
