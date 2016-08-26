import React, { PropTypes } from 'react';
import FeedBackCard from './common/FeedBackCard';
import {Element} from 'react-scroll';

const PeopleFeedBack = ({name, occupation}) => {
  return (
    <section className="feedback-section">
      <Element name="feedback">
        <h2>People feedback</h2>
        <FeedBackCard img={'https://placekitten.com/g/100/100'} name="Oliya" occupation="Senior Enginear"/>
        <FeedBackCard img={'https://placekitten.com/g/100/100'} name="Naimat" occupation="Tech Intusiats"/>
        <FeedBackCard img={'https://placekitten.com/g/100/100'} name="Oliya" occupation="Robotist"/>
      </Element>
    </section>
  );
};

export default PeopleFeedBack;
