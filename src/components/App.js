import React, { PropTypes } from 'react';
import Header from './contents/Header';

class App extends React.Component {
  render () {
    return (
      <div>
        <div className="container">
          <h1>ShowTech</h1>
          <Header/>
          {this.props.children}
        </div>
      </div>
    );
  }
}


App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
