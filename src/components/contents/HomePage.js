import React, {Component, PropTypes } from 'react';
import Payment from './Payment';
import Events from './Events';
import Speakers from './Speakers';
import PeopleFeedBack from './PeopleFeedBack';
import Sponsers from './Sponsers';
import Jumbotron from './Jumbotron';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideWidth: 0,
      eventName: '',
      cities:  [
        {city: 'Sydney, NSW', date: 'Aug 31-Sep 1'},
        {city: 'Melbourne, VIC', date: 'Sep 31-Oct 1'},
        {city: 'Brisbane, QLD', date: 'Oct 31-Nov 1'},
        {city: 'Adelaide, SA', date: 'Nov 31-Dec 1'},
        {city: 'Perth, WA', date: 'Dec 31-Jan 1'}
      ]
    };
    this.paySide = this.paySide.bind(this);
    this.paySideHtml = this.paySideHtml.bind(this);
    this.closePaySide = this.closePaySide.bind(this);
  }

  paySide(e, eventName) {
    e.preventDefault();
    this.setState({eventName});
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].style.width = "100%";
  }

  closePaySide(e) {
    e.preventDefault();
    this.setState({eventName: ''});
    e.target.parentNode.style.width = "0%";
  }

  paySideHtml() {
    return (
      <section id="mySidenav" className="sidenav" style={{width: `${this.state.sideWidth}%`}}>
        <a className="closebtn" onClick={this.closePaySide}>&times;</a>
        <Payment eventName={this.state.eventName}/>
      </section>
    );
  }

  render() {
    return (
      <section>
        {this.paySideHtml()}
        <Events onClick={this.paySide} cities={this.state.cities} />
        <hr />
        <Speakers />
        <hr />
        <PeopleFeedBack />
        <hr />
        <Sponsers />
      </section>
    );
  }
}

export default HomePage;
