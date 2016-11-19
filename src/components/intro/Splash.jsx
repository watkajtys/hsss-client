import React from 'react';
require('../../css/splash.css');
var createEntry = require('../../functions/createEntry').createEntry;

export default React.createClass({

  componentDidMount : function() {

    createEntry();

  },
  render: function () {
    return (
      <div id="splash">
        <div className="splash-logo-wrapper">
          <div className="logo-container"></div>
          <h3 className="center-text">
            An interactive story about dating in the digital age.
          </h3>
        </div>
        <div className="start-btn"></div>
      </div>
    )
  }
});