import React, { PropTypes } from 'react';
import {Element} from 'react-scroll';

const Footer = () => {
  return (
    <footer>
      <Element name="contactUs">
        <code>Coded with <span>&hearts;</span> by Asif</code>
        <a href="https://twitter.com/asifnorzai" target="_blank">Twitter</a>
        <a href="https://github.com/Pashtunzoy" target="_blank">Github</a>
        <a href="MAILTO:Admin@norzai.xyz?Subject=From%20ShowTech%20ContactUs">Email</a>
      </Element>
    </footer>
  );
};

export default Footer;
