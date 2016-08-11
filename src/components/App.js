import React, { PropTypes } from 'react';

class App extends React.Component {
  render () {
    return (
      <div>
        <div className="container">
          <h1>ShowTech</h1>
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
