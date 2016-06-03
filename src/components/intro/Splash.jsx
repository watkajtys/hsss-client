import React from 'react';
require('../../css/splash.css');

export default React.createClass({
  render: function () {
    return (
      <div id="splash">
        <div className="splash-logo-wrapper">
          <div className="he-wrap">
            <h1>He Said...</h1>
          </div>
          <div className="she-wrap">
            <h1>She Said</h1>
          </div>
          <h3 className="center-text">
            An interactive story about dating in the digital age.
          </h3>
        </div>
        <div className="start-btn">
          <i className="fa fa-angle-up up-icon"></i>
          <h1 className="start-text">Start</h1>
        </div>
      </div>
    )
  }
});