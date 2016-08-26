import React, {Component, PropTypes } from 'react';
import Scroll, {Link, Events, scrollSpy} from 'react-scroll';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
  }
  componentDidMount() {
    Events.scrollEvent.register('begin');

    Events.scrollEvent.register('end');

    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
    return (
      <header>
        <h1 className="logo-brand">ShowTech</h1>
        <nav>
          <ul>
            <li>
              <Link activeClass="active" to="events" spy={true} smooth={true} offset={-110} duration={500} >
                Events
              </Link>
            </li>
            {' '}
            <li>
              <Link activeClass="active" to="speakers" spy={true} smooth={true} offset={-110} duration={500} >
                Speakers
              </Link>
            </li>
            {' '}
            <li>
              <Link activeClass="active" to="feedback" spy={true} smooth={true} offset={-110} duration={500} >
                Feedback
              </Link>
            </li>
            {' '}
            <li>
              <Link activeClass="active" to="sponsers" spy={true} smooth={true} offset={50} duration={500} >
                Sponsers
              </Link>
            </li>
            {' '}
            <li>
              <Link activeClass="active" to="contactUs" spy={true} smooth={true} offset={50} duration={500} >
                ContactUs
              </Link>
            </li>
          </ul>
        </nav>
        <br />
      </header>
    );
  }
}

export default Header;
