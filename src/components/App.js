import React, { PropTypes } from 'react';
import Header from './contents/Header';
import Footer from './contents/Footer';
import HomePage from './contents/HomePage';
import Jumbotron from './contents/Jumbotron';

class App extends React.Component {
  render () {
    return (
      <div>
        <div className="container">
          <Header/>
          <Jumbotron />
          <main>
            <HomePage />
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
